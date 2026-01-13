import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "list_postman_configurations";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.postmanConfigurations.listByProjectIdReq> = {
  description:
    "Retrieves all Postman configurations for a specific project. Returns workspace and collection associations. Use this to view configured Postman integrations for a project.",
  inputSchema: models.schemas.postmanConfigurations.listByProjectIdReq,
};

const cb: ToolCallback<typeof models.schemas.postmanConfigurations.listByProjectIdReq> = async (params) => {
  try {
    const configurations = await services.postmanConfigurations.getByProjectId(params.project_id);

    const contentData: models.types.mcpServer.contentData<models.types.postmanConfigurations.Row[]> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Retrieved ${configurations.length} Postman configuration(s) for project ID ${params.project_id}`,
      data: configurations,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to list Postman configurations",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const listPostmanConfigurationsTool = {
  toolName,
  config,
  cb,
};
