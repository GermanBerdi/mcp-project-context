import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import * as models from "../../models/models.js";

export const buildContent = <T>(contentData: models.types.mcpServer.contentData<T>): CallToolResult => 
({
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(contentData),
    }
  ]
});

export const buildError = (contentData:models.types.mcpServer.errorData): CallToolResult => 
({
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(contentData),
    }
  ]
});