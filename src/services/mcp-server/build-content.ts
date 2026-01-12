import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import * as models from "../../models/models.js";

export const buildContent = (data:models.types.mcpServer.contentData): CallToolResult => 
({
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(data),
    }
  ]
});

export const buildError = (data:models.types.mcpServer.errorData): CallToolResult => 
({
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(data),
    }
  ]
});