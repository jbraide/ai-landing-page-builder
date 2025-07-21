// src/lib/socket-server.ts
import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import { generateComponent } from './ai-service';

// Define types for our messages
interface ClientMessage {
  type: 'prompt';
  prompt: string;
  sessionId: string;
  model: 'deepseek' | 'gemini';
}

interface ServerMessage {
  type: 'status' | 'component' | 'error';
  message: string;
  code?: string;
  sessionId: string;
}

const PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080;

// Create HTTP server for WebSocket upgrade
const server = createServer();
const wss = new WebSocketServer({ server });

// Map to track client sessions
const sessions = new Map<string, WebSocket>();

wss.on('connection', (ws: WebSocket, req: NextApiRequest | NextRequest) => {
  console.log('New WebSocket connection');

  ws.on('message', (data: string) => {
    try {
      const message: ClientMessage = JSON.parse(data);
      console.log('Received message:', message);

      // Validate message format
      if (!message.type || !message.prompt || !message.sessionId) {
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format',
          sessionId: message.sessionId || 'unknown'
        }));
        return;
      }

      // Handle different message types
      switch (message.type) {
        case 'prompt':
          handlePrompt(ws, message);
          break;
        default:
          ws.send(JSON.stringify({
            type: 'error',
            message: `Unsupported message type: ${message.type}`,
            sessionId: message.sessionId
          }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Error processing your request',
        sessionId: 'unknown'
      }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    // Clean up session
    for (const [sessionId, socket] of sessions.entries()) {
      if (socket === ws) {
        sessions.delete(sessionId);
        break;
      }
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function handlePrompt(ws: WebSocket, message: ClientMessage) {
  const { prompt, sessionId } = message;

  // Track session
  sessions.set(sessionId, ws);

  // Send initial processing status
  ws.send(JSON.stringify({
    type: 'status',
    message: 'Processing your request...',
    sessionId
  }));

  // Use AI service to generate component
  try {
    generateComponent(prompt, message.model)
      .then(code => {
        ws.send(JSON.stringify({
          type: 'component',
          message: 'Component generated successfully',
          code,
          sessionId
        }));
      })
      .catch(error => {
        console.error('AI generation error:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: `AI generation failed: ${error.message}`,
          sessionId
        }));
      });
  } catch (error) {
    console.error('Error generating component:', error);
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Unexpected error during AI processing',
      sessionId
    }));
  }
}

// Start WebSocket server
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

// Export for Next.js API route integration
export default wss;
```

This WebSocket server implementation:
1. Creates a WebSocket server on port 8080
2. Handles client connections and messages
3. Maintains session tracking
4. Defines message types for communication
5. Simulates AI processing with mock responses
6. Includes error handling and validation
7. Provides status updates during processing

To integrate with Next.js:
1. Create an API route to upgrade requests to WebSocket
2. Call `wss.handleUpgrade()` in the API route
3. Connect from the client using WebSocket API
