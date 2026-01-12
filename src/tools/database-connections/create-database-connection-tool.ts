import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "create_database_connection";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.databaseConnections.createReq> = {
  description:
    "Creates a new database connection configuration for a specific project. Use this to store connection details for project databases (MySQL, PostgreSQL, MongoDB, Redis, MariaDB, SQLite). Connection data includes host, port, credentials, and optional extra configuration. Multiple database connections can be associated with a single project.",
  inputSchema: models.schemas.databaseConnections.createReq,
};

const cb: ToolCallback<typeof models.schemas.databaseConnections.createReq> = async (params) => {
  try {
    const databaseConnection = await services.databaseConnections.create(params);

    const contentData: models.types.mcpServer.contentData<models.types.databaseConnections.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.Created,
      message: `Database connection '${databaseConnection.connection_name}' created successfully for project ID ${databaseConnection.project_id}`,
      data: databaseConnection,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to create database connection",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const createDatabaseConnectionTool = {
  toolName,
  config,
  cb,
};
