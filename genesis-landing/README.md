# Genesis Landing Builder

An AI-powered landing page builder that generates Next.js components through conversational AI. Users describe what they want, and the AI generates corresponding code in real-time.

## Features

- **Conversational UI**: Build landing pages through natural language prompts
- **Dual AI Models**: DeepSeek for component generation, Gemini for design suggestions
- **Real-time Preview**: Instantly see changes as you type
- **Responsive Design**: Preview on desktop, tablet, and mobile views
- **Component Generation**: Creates clean, production-ready Next.js components
- **WebSocket Integration**: Real-time communication between frontend and AI services

## Prerequisites

- Node.js v18+
- npm v9+
- DeepSeek API key
- Gemini API key

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/your-username/landingpage-builder.git
cd landingpage-builder/genesis-landing
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:
```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

## Running the Application

Start both the WebSocket server and Next.js development server:
```bash
npm run dev:full
```

Alternatively, run in separate terminals:
```bash
# Terminal 1: WebSocket server
npm run socket

# Terminal 2: Next.js development server
npm run dev
```

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── components/       # Reusable components
│   ├── lib/              # Utility functions and contexts
│   ├── page.tsx          # Main page
│   └── layout.tsx        # Root layout
├── public/               # Static assets
└── scripts/              # Utility scripts
```

## Key Files

- `src/lib/socket-server.ts`: WebSocket server implementation
- `src/lib/ai-service.ts`: AI integration with DeepSeek and Gemini
- `src/lib/ai-context.tsx`: React context for AI state management
- `src/components/ChatInterface.tsx`: Chat UI component
- `src/components/PreviewCanvas.tsx`: Component preview canvas
- `scripts/run-socket-server.js`: Script to run WebSocket server

## Available Scripts

- `npm run dev`: Start Next.js development server
- `npm run socket`: Start WebSocket server
- `npm run dev:full`: Start both servers concurrently
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Run linter

## Configuration

Environment variables in `.env.local`:

| Variable | Description |
|----------|-------------|
| `DEEPSEEK_API_KEY` | API key for DeepSeek service |
| `GEMINI_API_KEY` | API key for Google Gemini |
| `WS_PORT` | Port for WebSocket server (default: 8080) |
| `NEXT_PUBLIC_WS_URL` | WebSocket URL for client connection |

## Troubleshooting

- **WebSocket connection issues**: Ensure `npm run socket` is running
- **Missing API keys**: Verify keys are set in `.env.local`
- **Component not updating**: Check browser console for errors
- **AI service errors**: Verify API keys and service availability

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)