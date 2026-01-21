import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "update_database_connection";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.databaseConnections.updateReq> = {
  description:
    "Updates an existing database connection in the database. Allows modifying connection details such as name, host, port, credentials, and configuration. Provide the connection ID and at least one field to update. Use this to change database connection parameters without recreating the connection.",
  inputSchema: models.schemas.databaseConnections.updateReq,
};

const cb: ToolCallback<typeof models.schemas.databaseConnections.updateReq> = async (params) => {
  try {
    const databaseConnection = await services.databaseConnections.update(params);

    const contentData: models.types.mcpServer.contentData<models.types.databaseConnections.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Database connection '${databaseConnection.connection_name}' updated successfully`,
      data: databaseConnection,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to update database connection",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const updateDatabaseConnectionTool = {
  toolName,
  config,
  cb,
};
