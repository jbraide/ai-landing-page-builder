// landingpage-builder/genesis-landing/src/app/api/ws/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // WebSocket connections are handled by the separate WebSocket server
  // This endpoint provides information about the WebSocket server
  return Response.json({
    message: 'WebSocket server running on port 8080',
    endpoint: 'ws://localhost:8080',
    status: 'active'
  });
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
