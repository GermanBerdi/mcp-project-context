import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "create_postman_collection";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.postman.createCollectionReq> = {
  description:
    "Creates a new empty Postman collection in the specified workspace. This is a preparatory tool used before creating a project's Postman configuration. Use list_postman_workspaces to find available workspace IDs. Returns the created collection's ID, name, and UID.",
  inputSchema: models.schemas.postman.createCollectionReq,
};

const cb: ToolCallback<typeof models.schemas.postman.createCollectionReq> = async (params) => {
  try {
    const result = await services.postman.createCollection(params);

    const contentData: models.types.mcpServer.contentData<models.types.postman.CreatedCollection> = {
      success: true,
      httpCode: models.enums.HttpStatus.Created,
      message: `Collection "${result.name}" created successfully with ID ${result.id}`,
      data: result,
    };
    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to create Postman collection",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const createPostmanCollectionTool = {
  toolName,
  config,
  cb,
};
