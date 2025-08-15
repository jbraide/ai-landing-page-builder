"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/run-socket-server.mts
var path = require("path");
var dotenv = require("dotenv");
var http = require("http");
var socket_server_js_1 = require("../src/lib/socket-server.js");
// Load environment variables
dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
});
// Validate required environment variables
var REQUIRED_ENV = ["DEEPSEEK_API_KEY", "GEMINI_API_KEY"];
REQUIRED_ENV.forEach(function (key) {
    if (!process.env[key]) {
        console.error("ERROR: Missing ".concat(key, " in environment"));
        process.exit(1);
    }
});
var PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080;
var server = http.createServer();
// Attach WebSocket server to HTTP server
socket_server_js_1.default.on("error", function (error) {
    console.error("WebSocket server error:", error);
});
server.on("upgrade", function (request, socket, head) {
    try {
        socket_server_js_1.default.handleUpgrade(request, socket, head, function (ws) {
            socket_server_js_1.default.emit("connection", ws, request);
        });
    }
    catch (error) {
        console.error("WebSocket upgrade error:", error);
        socket.destroy();
    }
});
// Start server
server.listen(PORT, function () {
    console.log("WebSocket server running on port ".concat(PORT));
    console.log("Environment: ".concat(process.env.NODE_ENV || "development"));
    console.log("DeepSeek API: Configured");
    console.log("Gemini API: Configured");
});
// Handle graceful shutdown
process.on("SIGINT", function () {
    console.log("Shutting down WebSocket server...");
    // Close all client connections
    socket_server_js_1.default.clients.forEach(function (client) {
        if (client.readyState === client.OPEN) {
            client.close();
        }
    });
    // Close WebSocket server
    socket_server_js_1.default.close(function () {
        console.log("WebSocket server closed");
        // Close HTTP server
        server.close(function () {
            console.log("HTTP server closed");
            process.exit(0);
        });
    });
});
// Handle uncaught exceptions
process.on("uncaughtException", function (error) {
    console.error("Uncaught exception:", error);
    process.exit(1);
});
