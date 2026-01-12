import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "get_project_by_id";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.projects.getByIdReq> = {
  description:
    "Retrieves a specific project from the database by its unique ID. Returns complete project details including name, description, status, and timestamps. Use this when you need information about a particular project.",
  inputSchema: models.schemas.projects.getByIdReq,
};

const cb: ToolCallback<typeof models.schemas.projects.getByIdReq> = async (params) => {
  try {
    const project = await services.projects.getById(params.id);

    const contentData: models.types.mcpServer.contentData<models.types.projects.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Project '${project.project_name}' retrieved successfully`,
      data: project,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to get project",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const getProjectByIdTool = {
  toolName,
  config,
  cb,
};
