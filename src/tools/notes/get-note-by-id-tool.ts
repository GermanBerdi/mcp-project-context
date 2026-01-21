import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "get_note_by_id";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.notes.getByIdReq> = {
  description:
    "Retrieves a single note by its unique ID. Returns the complete note details including content, project association, and timestamps. Use this when you need information about a specific note.",
  inputSchema: models.schemas.notes.getByIdReq,
};

const cb: ToolCallback<typeof models.schemas.notes.getByIdReq> = async (params) => {
  try {
    const note = await services.notes.getById(params.id);

    const contentData: models.types.mcpServer.contentData<models.types.notes.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Note with ID ${params.id} retrieved successfully`,
      data: note,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to retrieve note",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const getNoteByIdTool = {
  toolName,
  config,
  cb,
};
