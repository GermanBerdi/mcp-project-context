import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "list_postman_collections";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.postman.listCollectionsReq> = {
  description:
    "Retrieves all collections from a specific Postman workspace. Returns an array of collections with their ID, name, owner, timestamps, and visibility. Use this to discover available collections within a workspace.",
  inputSchema: models.schemas.postman.listCollectionsReq,
};

const cb: ToolCallback<typeof models.schemas.postman.listCollectionsReq> = async (params) => {
  try {
    const result = await services.postman.listCollections(params);

    const contentData: models.types.mcpServer.contentData<models.types.postman.ListCollectionsRes> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Retrieved ${result.collections.length} collection(s) successfully`,
      data: result,
    };
    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to list Postman collections",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const listPostmanCollectionsTool = {
  toolName,
  config,
  cb,
};
