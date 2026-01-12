import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "execute_sql";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.sqlExec.executeReq> = {
  description:
    "Executes a SQL query using a specific database connection. Use this to interact with project databases by running SELECT, INSERT, UPDATE, DELETE, or any valid SQL statement. Supports parameterized queries to prevent SQL injection. Returns query results and field metadata.",
  inputSchema: models.schemas.sqlExec.executeReq,
};

const cb: ToolCallback<typeof models.schemas.sqlExec.executeReq> = async (params) => {
  try {
    const result = await services.sqlExec.execute(params);

    const contentData: models.types.mcpServer.contentData<models.types.sqlExec.ExecuteRes> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: "SQL query executed successfully",
      data: result,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to execute SQL query",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const executeSqlTool = {
  toolName,
  config,
  cb,
};
