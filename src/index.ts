#!/usr/bin/env node
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, ".env") });

import type { RowDataPacket } from "mysql2";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { healthCheckTool } from "./tools/health-check/health-check.js";
import { createDatabaseConnectionTool } from "./tools/database-connections/create-database-connection-tool.js";
import { listDatabaseConnectionsTool } from "./tools/database-connections/list-database-connections-tool.js";
import { createNoteTool } from "./tools/notes/create-note-tool.js";
import { getNoteByIdTool } from "./tools/notes/get-note-by-id-tool.js";
import { listNotesTool } from "./tools/notes/list-notes-tool.js";
import { removeNoteTool } from "./tools/notes/remove-note-tool.js";
import { updateNoteTool } from "./tools/notes/update-note-tool.js";
import { createPostmanCollectionTool } from "./tools/postman/create-collection-tool.js";
import { listPostmanCollectionsTool } from "./tools/postman/list-collections-tool.js";
import { listPostmanWorkspacesTool } from "./tools/postman/list-workspaces-tool.js";
import { createPostmanConfigurationTool } from "./tools/postman-configurations/create-postman-configuration-tool.js";
import { listPostmanConfigurationsTool } from "./tools/postman-configurations/list-postman-configurations-tool.js";
import { createProjectTool } from "./tools/projects/create-project.js";
import { getProjectByIdTool } from "./tools/projects/get-project-by-id-tool.js";
import { listProjectsTool } from "./tools/projects/list-projects-tool.js";
import { removeProjectTool } from "./tools/projects/remove-project-tool.js";
import { updateProjectTool } from "./tools/projects/update-project.js";
import { executeSqlTool } from "./tools/sql-exec/execute-sql-tool.js";
import { pool, initPool } from "./db/connection.js";

interface NowRow extends RowDataPacket {
  now: Date;
}

const testDbConnection = async () => {
  try {
    const [rows] = await pool.execute<NowRow[]>("SELECT NOW() AS now");
    console.log("✅ Database connected:", rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
};

const mcpServer = new McpServer({
  name: "mcp-project-context",
  version: "1.0.1",
});

mcpServer.registerTool(healthCheckTool.toolName, healthCheckTool.config, healthCheckTool.cb);
mcpServer.registerTool(
  createDatabaseConnectionTool.toolName,
  createDatabaseConnectionTool.config,
  createDatabaseConnectionTool.cb,
);
mcpServer.registerTool(
  listDatabaseConnectionsTool.toolName,
  listDatabaseConnectionsTool.config,
  listDatabaseConnectionsTool.cb,
);
mcpServer.registerTool(createNoteTool.toolName, createNoteTool.config, createNoteTool.cb);
mcpServer.registerTool(getNoteByIdTool.toolName, getNoteByIdTool.config, getNoteByIdTool.cb);
mcpServer.registerTool(listNotesTool.toolName, listNotesTool.config, listNotesTool.cb);
mcpServer.registerTool(removeNoteTool.toolName, removeNoteTool.config, removeNoteTool.cb);
mcpServer.registerTool(updateNoteTool.toolName, updateNoteTool.config, updateNoteTool.cb);

mcpServer.registerTool(
  createPostmanCollectionTool.toolName,
  createPostmanCollectionTool.config,
  createPostmanCollectionTool.cb,
);
mcpServer.registerTool(
  listPostmanCollectionsTool.toolName,
  listPostmanCollectionsTool.config,
  listPostmanCollectionsTool.cb,
);
mcpServer.registerTool(
  listPostmanWorkspacesTool.toolName,
  listPostmanWorkspacesTool.config,
  listPostmanWorkspacesTool.cb,
);
mcpServer.registerTool(
  createPostmanConfigurationTool.toolName,
  createPostmanConfigurationTool.config,
  createPostmanConfigurationTool.cb,
);
mcpServer.registerTool(
  listPostmanConfigurationsTool.toolName,
  listPostmanConfigurationsTool.config,
  listPostmanConfigurationsTool.cb,
);
mcpServer.registerTool(createProjectTool.toolName, createProjectTool.config, createProjectTool.cb);
mcpServer.registerTool(getProjectByIdTool.toolName, getProjectByIdTool.config, getProjectByIdTool.cb);
mcpServer.registerTool(listProjectsTool.toolName, listProjectsTool.config, listProjectsTool.cb);
mcpServer.registerTool(removeProjectTool.toolName, removeProjectTool.config, removeProjectTool.cb);
mcpServer.registerTool(updateProjectTool.toolName, updateProjectTool.config, updateProjectTool.cb);
mcpServer.registerTool(executeSqlTool.toolName, executeSqlTool.config, executeSqlTool.cb);

const main = async () => {
  initPool();
  await testDbConnection();
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.log("MCP Project Context server running on stdio");
};

main();
