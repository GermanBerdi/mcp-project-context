import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "remove_database_connection";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.databaseConnections.removeReq> = {
  description:
    "Deletes a database connection from the database by its unique ID. This operation is permanent and cannot be undone. The database connection must exist in the database. Use this when you need to permanently remove a database connection configuration.",
  inputSchema: models.schemas.databaseConnections.removeReq,
};

const cb: ToolCallback<typeof models.schemas.databaseConnections.removeReq> = async (params) => {
  try {
    const databaseConnection = await services.databaseConnections.getById(params.id);
    await services.databaseConnections.remove(params.id);

    const contentData: models.types.mcpServer.contentData<never> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Database connection '${databaseConnection.connection_name}' (ID: ${params.id}) removed successfully`,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to remove database connection",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const removeDatabaseConnectionTool = {
  toolName,
  config,
  cb,
};
