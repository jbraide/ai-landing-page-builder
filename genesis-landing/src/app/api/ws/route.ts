// landingpage-builder/genesis-landing/src/app/api/ws/route.ts
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // WebSocket connections are handled by the separate WebSocket server
  // This endpoint provides information about the WebSocket server
  return Response.json({
    message: "WebSocket server running on port 8080",
    endpoint: "ws://localhost:8080",
    status: "active",
  });
}
