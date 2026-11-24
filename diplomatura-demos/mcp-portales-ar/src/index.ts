#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { createServer } from "./server.js";

if (process.argv.includes("--http")) {
  const port = Number(process.env.PORT ?? 3333);
  const app = express();
  app.use(express.json());
  // Modo sin estado: un servidor y un transporte por request.
  app.post("/mcp", async (req, res) => {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => { transport.close(); server.close(); });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });
  app.listen(port, "127.0.0.1", () => console.error(`mcp-portales-ar HTTP en http://127.0.0.1:${port}/mcp`));
} else {
  await createServer().connect(new StdioServerTransport());
  console.error("mcp-portales-ar listo (stdio)");
}
