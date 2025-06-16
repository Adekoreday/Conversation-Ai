# Conversation AI


This project contains a simple and helpful conversational AI assistant.
That can retain context of chat within a specific context window and converse in your language of choice

This project tech stack includes 
1. Grok
2. LangGraph

## How To Get Started 
1. Create a dotenv file and add your GROQ_API_KEY
2. nvm use (Ensure you have the right npm version specified for the project)
3. npm install
3. npm run start


### How It Works
The app reads your input via readline (from the CLI).

Each input is passed to a context-aware chat function powered by a predefined prompt template.

The chat function is tailored to act as a helpful assistant and can be modified for different use cases.

Context Management
This project uses the MemorySaver checkpointer for simplicity, which retains a limited context window.

Note: MemorySaver is not recommended for production.
For production environments, consider using:

SqliteSaver for lightweight persistence

PostgresSaver for scalable, production-grade storage

Language Support
Supports multilingual interaction, just start chatting in your preferred language.

Future Improvements
Improved CLI UX (spinner, markdown output)

Plugin support

Multi-user memory handling

Web interface