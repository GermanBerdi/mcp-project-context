import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "create_postman_configuration";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.postmanConfigurations.createReq> = {
  description:
    "Creates a new Postman configuration for a project. Stores workspace ID, collection ID, and API key association. Use this to link a project with its Postman workspace and collection for API development and testing.",
  inputSchema: models.schemas.postmanConfigurations.createReq,
};

const cb: ToolCallback<typeof models.schemas.postmanConfigurations.createReq> = async (params) => {
  try {
    const configuration = await services.postmanConfigurations.create(params);

    const contentData: models.types.mcpServer.contentData<models.types.postmanConfigurations.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.Created,
      message: `Postman configuration "${configuration.configuration_name}" created successfully for project ID ${configuration.project_id}`,
      data: configuration,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to create Postman configuration",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const createPostmanConfigurationTool = {
  toolName,
  config,
  cb,
};
