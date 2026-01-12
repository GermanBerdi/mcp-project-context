import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import * as services from "../../services/services.js";

import * as models from "../../models/models.js";

const toolName = "create_project";

const config: models.types.mcpServer.ToolConfig<typeof models.schemas.projects.createReq> = {
  description: "Creates a new project to manage AI agent context. This tool initializes a project container to store notes, context, and progress details, enabling the AI agent to maintain continuity across sessions. The project acts as a knowledge base that the AI references to understand the current state, decisions, and ongoing work without requiring full explanations on each interaction.",
  inputSchema: models.schemas.projects.createReq,
};

const cb: ToolCallback<typeof models.schemas.projects.createReq> = async (params) => {
  try {
    const project = await services.projects.create(params);
    
    const contentData: models.types.mcpServer.contentData<models.types.projects.CreateReq> = {
      success: true,
      httpCode: models.enums.HttpStatus.Created,
      message: `Project '${project.project_name}' created successfully`,
      data: project,
    };
    
    return services.mcpServer.buildContent(contentData);
  } catch (error: unknown) {
    const errorData: models.types.mcpServer.errorData = {
      success: false,
      httpCode: models.enums.HttpStatus.InternalServerError,
      message: "Failed to create project",
      error: error instanceof Error ? error.message : String(error),
    };
    return services.mcpServer.buildError(errorData);
  }
};

export const createProjectTool = {
  toolName,
  config,
  cb,
};
