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
import { listNotesTool } from "./tools/notes/list-notes-tool.js";
import { createProjectTool } from "./tools/projects/create-project.js";
import { getProjectByIdTool } from "./tools/projects/get-project-by-id-tool.js";
import { listProjectsTool } from "./tools/projects/list-projects-tool.js";
import { removeProjectTool } from "./tools/projects/remove-project-tool.js";
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
mcpServer.registerTool(listNotesTool.toolName, listNotesTool.config, listNotesTool.cb);
mcpServer.registerTool(createProjectTool.toolName, createProjectTool.config, createProjectTool.cb);
mcpServer.registerTool(getProjectByIdTool.toolName, getProjectByIdTool.config, getProjectByIdTool.cb);
mcpServer.registerTool(listProjectsTool.toolName, listProjectsTool.config, listProjectsTool.cb);
mcpServer.registerTool(removeProjectTool.toolName, removeProjectTool.config, removeProjectTool.cb);
mcpServer.registerTool(executeSqlTool.toolName, executeSqlTool.config, executeSqlTool.cb);

const main = async () => {
  initPool();
  await testDbConnection();
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.log("MCP Project Context server running on stdio");
};

main();
