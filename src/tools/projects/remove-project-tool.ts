import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "remove_project";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.projects.removeReq> = {
  description:
    "Deletes a project from the database by its unique ID. This operation is permanent and cannot be undone. The project must exist in the database. Use this when you need to permanently remove a project and all its associated data.",
  inputSchema: models.schemas.projects.removeReq,
};

const cb: ToolCallback<typeof models.schemas.projects.removeReq> = async (params) => {
  try {
    const project = await services.projects.getById(params.id);
    await services.projects.remove(params.id);

    const contentData: models.types.mcpServer.contentData<never> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Project '${project.project_name}' (ID: ${params.id}) removed successfully`,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to remove project",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const removeProjectTool = {
  toolName,
  config,
  cb,
};
