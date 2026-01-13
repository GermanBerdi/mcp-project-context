import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "list_postman_workspaces";

const config: models.types.mcpServer.ToolConfig = {
  description:
    "Retrieves all Postman workspaces accessible with the configured API key. Returns an array of workspaces with their ID, name, type, visibility, and other details. Use this to discover available workspaces when setting up Postman configurations for projects.",
};

const cb: ToolCallback = async () => {
  try {
    const result = await services.postman.listWorkspaces();

    const contentData: models.types.mcpServer.contentData<models.types.postman.ListWorkspacesRes> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Retrieved ${result.workspaces.length} workspace(s) successfully`,
      data: result,
    };
    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to list Postman workspaces",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const listPostmanWorkspacesTool = {
  toolName,
  config,
  cb,
};
