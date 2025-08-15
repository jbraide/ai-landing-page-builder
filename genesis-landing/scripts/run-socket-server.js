#!/usr/bin/env node
// Description: HTTP server for AI component generation

const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const {
  generateComponent,
  validateComponent,
} = require("../src/lib/ai-service.js");

// 1. Environment setup
dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

// 2. Validate required variables
const REQUIRED_ENV = ["DEEPSEEK_API_KEY", "GEMINI_API_KEY"];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    console.error(`ERROR: Missing ${key} in environment`);
    process.exit(1);
  }
});

// Use HTTP_PORT for clarity, defaulting to 3001
const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3001;

// 3. Main functionality
const server = http.createServer(async (req, res) => {
  // Set CORS headers for all responses to allow frontend to communicate
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/generate") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const { prompt, model } = JSON.parse(body);

        if (!prompt || !model) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Missing prompt or model in request body",
            }),
          );
          return;
        }

        console.log(
          `[${new Date().toISOString()}] Received generation request for model: ${model}`,
        );
        const componentCode = await generateComponent(prompt, model);

        // Basic validation of the generated component
        if (!validateComponent(componentCode)) {
          console.error(
            `[${new Date().toISOString()}] Generated component failed validation.`,
          );
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error:
                "Generated component failed validation. Please refine your prompt.",
            }),
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ componentCode }));
        console.log(
          `[${new Date().toISOString()}] Successfully generated component for model: ${model}`,
        );
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] Generation failed: ${error.message}`,
        );
        console.error(
          "Solution: Check AI service configuration and API keys. Also, review the prompt for clarity and scope.",
        );
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: `AI generation failed: ${error.message}` }),
        );
      }
    });
  } else {
    // For any other request, return a 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// 4. Cleanup handlers (Graceful Shutdown)
process.on("SIGINT", () => {
  console.log(
    `[${new Date().toISOString()}] Received SIGINT. Shutting down HTTP server...`,
  );
  server.close(() => {
    console.log(`[${new Date().toISOString()}] HTTP server closed.`);
    process.exit(0);
  });
});

process.on("uncaughtException", (error) => {
  console.error(`[${new Date().toISOString()}] Uncaught exception:`, error);
  console.error(
    "Solution: Review server logs for detailed error information and ensure environment variables are set correctly.",
  );
  process.exit(1);
});

// Start the server
server.listen(PORT, () => {
  console.log(
    `[${new Date().toISOString()}] HTTP server running on port ${PORT}`,
  );
  console.log(
    `[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV || "development"}`,
  );
  console.log(`[${new Date().toISOString()}] DeepSeek API: Configured`);
  console.log(`[${new Date().toISOString()}] Gemini API: Configured`);
});
