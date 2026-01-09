#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getToolsList } from "./tools/toolsList.js";

// Create MCP server
const server = new Server(
  {
    name: "mcp-project-context",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, getToolsList);

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "hello_world") {
    const userName = args?.name || "World";
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${userName}! 👋`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `Unknown tool: ${name}`,
      },
    ],
    isError: true,
  };
});

// Start server
const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Project Context server running on stdio");
};

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});


