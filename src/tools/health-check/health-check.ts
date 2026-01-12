import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "health_check";

const config: models.types.mcpServer.ToolConfig = {
  description: "Verifies that the Project Context MCP Server is running and responding correctly",
};

const cb: ToolCallback = async () => {
  try {
    const contentData: models.types.mcpServer.contentData<never> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: "Project Context MCP Server is running and healthy",
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Project Context MCP Server health check failed",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const healthCheckTool = {
  toolName,
  config,
  cb,
};
