import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "list_projects";

const config: models.types.mcpServer.ToolConfig = {
  description: "Retrieves all projects from the database. Returns an array with project details including name, description, status, and timestamps. Use this to view available projects, check project statuses, or get an overview of all managed projects.",
};

const cb: ToolCallback = async () => {
  try {
    const projects: models.types.projects.Row[] = await services.projects.getAll();
    const contentData: models.types.mcpServer.contentData<models.types.projects.Row[]> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Retrieved ${projects.length} project(s) successfully`,
      data: projects,
    };
    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to list projects",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const listProjectsTool = {
  toolName,
  config,
  cb,
};
