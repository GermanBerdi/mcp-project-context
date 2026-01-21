import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "get_database_connection_by_id";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.databaseConnections.getByIdReq> = {
  description:
    "Retrieves a specific database connection from the database by its unique ID. Returns complete database connection details including host, port, database name, credentials, and timestamps. Use this when you need information about a particular database connection.",
  inputSchema: models.schemas.databaseConnections.getByIdReq,
};

const cb: ToolCallback<typeof models.schemas.databaseConnections.getByIdReq> = async (params) => {
  try {
    const databaseConnection = await services.databaseConnections.getById(params.id);

    const contentData: models.types.mcpServer.contentData<models.types.databaseConnections.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Database connection '${databaseConnection.connection_name}' retrieved successfully`,
      data: databaseConnection,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to get database connection",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const getDatabaseConnectionByIdTool = {
  toolName,
  config,
  cb,
};
