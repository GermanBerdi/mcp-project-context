#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { healthCheckTool } from "./tools/health-check/health-check.js";

const mcpServer = new McpServer({
  name: "mcp-project-context",
  version: "1.0.1",
});

mcpServer.registerTool(healthCheckTool.toolName, healthCheckTool.config, healthCheckTool.cb);

const main = async () => {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP Project Context server running on stdio");
};

main();
