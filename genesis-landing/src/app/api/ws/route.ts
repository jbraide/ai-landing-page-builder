// landingpage-builder/genesis-landing/src/app/api/ws/route.ts
import { NextRequest } from 'next/server';
import { wss } from '@/lib/socket-server';

export async function GET(request: NextRequest) {
  try {
    // Check if WebSocket upgrade request
    if (request.headers.get('upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade request', { status: 400 });
    }

    // Handle WebSocket upgrade
    const { socket, response } = Deno.upgradeWebSocket(request);
    wss.handleUpgrade(request, socket as any, Buffer.alloc(0), (ws) => {
      wss.emit('connection', ws, request);
    });

    return response;
  } catch (error) {
    console.error('WebSocket upgrade error:', error);
    return new Response('WebSocket upgrade failed', { status: 500 });
  }
}
```

This API route:
1. Handles WebSocket upgrade requests from clients
2. Integrates with our WebSocket server implementation
3. Provides proper error handling for upgrade failures
4. Uses Deno's WebSocket upgrade API for Next.js compatibility
5. Returns appropriate HTTP responses for non-WebSocket requests

To use this:
1. Clients connect to `ws://localhost:3000/api/ws`
2. The route delegates to our WebSocket server implementation
3. Handles the full WebSocket lifecycle
4. Maintains compatibility with Next.js App Router

Note: You'll need to start the WebSocket server separately during development. For production, you'll want to integrate this with your deployment environment.
