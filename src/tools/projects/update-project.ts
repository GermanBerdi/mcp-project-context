import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "update_project";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.projects.updateReq> = {
  description:
    "Updates an existing project in the database. Allows modifying project name, description, and/or status. Provide the project ID and at least one field to update. Use this to change project details or update project status (active, paused, archived, completed).",
  inputSchema: models.schemas.projects.updateReq,
};

const cb: ToolCallback<typeof models.schemas.projects.updateReq> = async (params) => {
  try {
    const project = await services.projects.update(params);

    const contentData: models.types.mcpServer.contentData<models.types.projects.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Project '${project.project_name}' updated successfully`,
      data: project,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to update project",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const updateProjectTool = {
  toolName,
  config,
  cb,
};
