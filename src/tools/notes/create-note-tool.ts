import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "create_note";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.notes.createReq> = {
  description:
    "Creates a new note in the database associated with a specific project. Use this to add context, documentation, or important information to a project. Notes help maintain continuity and knowledge across AI agent sessions.",
  inputSchema: models.schemas.notes.createReq,
};

const cb: ToolCallback<typeof models.schemas.notes.createReq> = async (params) => {
  try {
    const note = await services.notes.create(params);

    const contentData: models.types.mcpServer.contentData<models.types.notes.Row> = {
      success: true,
      httpCode: models.enums.HttpStatus.Created,
      message: `Note created successfully for project ID ${note.project_id}`,
      data: note,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to create note",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const createNoteTool = {
  toolName,
  config,
  cb,
};
