import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "list_notes";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.notes.listByProjectIdReq> = {
  description:
    "Retrieves all notes associated with a specific project from the database. Returns an array of notes including their content, timestamps, and IDs. Use this to load project context at the beginning of a session or to review all documentation for a project.",
  inputSchema: models.schemas.notes.listByProjectIdReq,
};

const cb: ToolCallback<typeof models.schemas.notes.listByProjectIdReq> = async (params) => {
  try {
    const result = await services.notes.getByProjectId(params.project_id, params.pagination);

    const contentData: models.types.mcpServer.contentData<models.types.util.PaginatedData<models.types.notes.Row>> = {
      success: true,
      httpCode: models.enums.HttpStatus.OK,
      message: `Retrieved ${result.pagination.items_count} note(s) for project ID ${params.project_id} (page ${result.pagination.page} of ${result.pagination.total_pages})`,
      data: result,
    };

    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to list notes",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const listNotesTool = {
  toolName,
  config,
  cb,
};
