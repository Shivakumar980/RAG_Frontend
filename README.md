# RAG Chatbot Frontend

A modern React frontend for a RAG chatbot with real-time WebSocket communication.

## Features

- Real-time chat interface with WebSocket connection
- Session persistence and conversation history
- Typing indicators and connection status
- Responsive design for desktop and mobile
- Auto-scroll and error handling

## Tech Stack

- React 19 + Vite 6
- WebSocket API
- Lucide React icons
- CSS-in-JS styling

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
## Message Format
// Outgoing
{
  query: "User's question",
  session_id: "optional-session-id"
}

// Incoming
{
  session_id: "session-id",
  answer: "Bot response",
  is_direct_match: true,
  similarity_score: 0.95
}
