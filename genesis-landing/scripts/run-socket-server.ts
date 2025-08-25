#!/usr/bin/env ts-node
// WebSocket server for Genesis Landing AI builder

import path from "path";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import { wss } from "../src/lib/socket-server"; // Adjust import to TypeScript

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, "../../.env.local"),
});

// Validate required environment variables
const REQUIRED_ENV = ["DEEPSEEK_API_KEY", "GEMINI_API_KEY"];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    console.error(`ERROR: Missing ${key} in environment`);
    process.exit(1);
  }
});

const PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080;
const server = http.createServer();

// Attach WebSocket server to HTTP server
(wss as WebSocketServer).on("error", (error) => {
  console.error("WebSocket server error:", error);
});

server.on("upgrade", (request, socket, head) => {
  try {
    (wss as WebSocketServer).handleUpgrade(request, socket, head, (ws) => {
      (wss as WebSocketServer).emit("connection", ws, request);
    });
  } catch (error) {
    console.error("WebSocket upgrade error:", error);
    socket.destroy();
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("DeepSeek API: Configured");
  console.log("Gemini API: Configured");
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down WebSocket server...");

  // Close all client connections
  (wss as WebSocketServer).clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.close();
    }
  });

  // Close WebSocket server
  (wss as WebSocketServer).close(() => {
    console.log("WebSocket server closed");

    // Close HTTP server
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});
