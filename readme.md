# Conversation AI
<img width="777" alt="Screenshot 2025-06-16 at 02 04 33" src="https://github.com/user-attachments/assets/dc61d52a-b19b-4004-8cb4-61f1f5ba724a" />

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

**Context Management**
This project uses the MemorySaver checkpointer for simplicity, which retains a limited context window.

_Note: MemorySaver is not recommended for production.
For production environments, consider using_:
- SqliteSaver for lightweight persistence
- PostgresSaver for scalable, production-grade storage

**Language Support**
Supports multilingual interaction, just start chatting in your preferred language.

Future Improvements
1. Improved CLI UX (spinner, markdown output)
2. Plugin support
3. Multi-user memory handling
4. Web interface
