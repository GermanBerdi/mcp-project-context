import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "update_note";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.notes.updateReq> = {
  description:
    "Updates an existing note in the database. Allows modifying note content. Provide the note ID and the new content. Use this to change note details.",
  inputSchema: models.schemas.notes.updateReq,
};

const cb: ToolCallback<typeof models.schemas.notes.updateReq> = async (params) => {
  try {
    const note = await services.notes.update(params);

    const contentData: models.types.mcpServer.contentData<models.types.notes.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Note with ID ${note.id} updated successfully`,
      data: note,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to update note",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const updateNoteTool = {
  toolName,
  config,
  cb,
};
