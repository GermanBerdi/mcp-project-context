import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "list_database_connections";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.databaseConnections.listByProjectIdReq> = {
  description:
    "Retrieves all database connections associated with a specific project from the database. Returns an array of database connections including their configuration details, credentials, and connection metadata. Use this to view all database connections configured for a project.",
  inputSchema: models.schemas.databaseConnections.listByProjectIdReq,
};

const cb: ToolCallback<typeof models.schemas.databaseConnections.listByProjectIdReq> = async (params) => {
  try {
    const databaseConnections = await services.databaseConnections.getByProjectId(params.project_id);

    const contentData: models.types.mcpServer.contentData<models.types.databaseConnections.Row[]> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Retrieved ${databaseConnections.length} database connection(s) for project ID ${params.project_id}`,
      data: databaseConnections,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to list database connections",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const listDatabaseConnectionsTool = {
  toolName,
  config,
  cb,
};
