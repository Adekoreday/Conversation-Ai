import { config } from "dotenv";
config();

import { ChatGroq } from "@langchain/groq";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Annotation
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  trimMessages,
} from "@langchain/core/messages";

const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});


const memorySaver = new MemorySaver() 


export async function contextAwareChat(userMessage: string, threadId: string = uuidv4()) {
  // Initialize the LLM
  const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY!,
  });

  // Define the State
const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  language: Annotation<string>(),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
  ],
  ["placeholder", "{messages}"],
]);

  // Define model invocation function
  const callModel2 = async (state: typeof GraphAnnotation.State) => {
    const trimmedMessage = await trimmer.invoke(state.messages);
    const prompt = await promptTemplate.invoke({
      messages: trimmedMessage,
      language: state.language,
    });
    const response = await llm.invoke(prompt);
    return { messages: [response] };
  };

  // Build the workflow
  const workflow2 = new StateGraph(MessagesAnnotation)
    .addNode("model", callModel2)
    .addEdge(START, "model")
    .addEdge("model", END);

  const app2 = workflow2.compile({ checkpointer: memorySaver });

  // we can dynamically set the language 
  const config = { configurable: { thread_id: threadId } };
  const input = {
    messages: [{
      role: "user",
      content: userMessage,
    }],
    language: "English",
  };

  const output = await app2.invoke(input, config);
  const response = output.messages[output.messages.length - 1];
  return response;
}
