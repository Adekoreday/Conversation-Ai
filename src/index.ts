import { v4 as uuidv4 } from "uuid";
import chalk from 'chalk';
import { contextAwareChat } from './context-aware-chat/index.js';
import readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to prompt questions using async/await
const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const main = async () => {
  console.log(chalk.yellow("Hello! I'm a simple AI assistant. Ask me anything. Type 'exit' to quit."));
  const threadId = uuidv4();

  while (true) {
    const question = await askQuestion("> ");

    if (question.toLowerCase() === 'exit') {
      console.log("Goodbye! 👋");
      break;
    }

    try {
      const response = await contextAwareChat(question, threadId);
      console.log(chalk.green(`AI Assistant says: ${response.content}`));
    } catch (err) {
      console.error("Oops, something went wrong:", err);
    }
  }

  rl.close();
};

main();
