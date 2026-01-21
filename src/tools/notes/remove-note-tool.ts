import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "remove_note";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.notes.removeReq> = {
  description:
    "Deletes a note from the database by its unique ID. This operation is permanent and cannot be undone. The note must exist in the database. Use this when you need to permanently remove a note.",
  inputSchema: models.schemas.notes.removeReq,
};

const cb: ToolCallback<typeof models.schemas.notes.removeReq> = async (params) => {
  try {
    await services.notes.remove(params.id);

    const contentData: models.types.mcpServer.contentData<null> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Note with ID ${params.id} removed successfully`,
      data: null,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to remove note",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const removeNoteTool = {
  toolName,
  config,
  cb,
};
