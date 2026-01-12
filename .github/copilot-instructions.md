# MCP Project Context - Copilot Instructions

## Project Identification

**Project Name**: mcp-project-context  
**Project ID in Database**: 1

This information is used to load project-specific context notes at the start of each session.

---

## Session Initialization Protocol

**IMPORTANT**: At the start of EVERY new session or conversation about this project, you MUST follow this initialization protocol:

### Step 1: Load Project Context

```
Use the MCP tool: list_notes with project_id = 1
```

This will load ALL accumulated context notes for the mcp-project-context project.

### Step 2: Review Context

Read each note carefully to understand:

- Architecture decisions and patterns
- Coding conventions established
- Database schema and migrations
- Configuration details
- Tool development processes
- Git commit guidelines
- Any other project-specific knowledge

### Why This Matters

These notes contain critical information about:

- How to develop new MCP tools following the established step-by-step process
- Naming conventions (kebab-case files, snake_case tool names, PascalCase types)
- Pre-commit workflow (lint:format before committing)
- Conventional commit format (always in English)
- Database connection details and schema
- Current project state and completed features

**Action Required**: BEFORE making any recommendations or code changes, complete the 2-step initialization protocol to ensure continuity with previous sessions and alignment with established patterns.

**Confirmation Message**: After completing the initialization protocol, send a message to the user:

```
Estoy preparado para trabajar en el proyecto "mcp-project-context". Ya he cargado todas las notas.
```

---

## Project Overview

This is an MCP (Model Context Protocol) server that provides tools for managing projects and their associated notes in a MySQL database.

### Available MCP Tools

- `health_check` - Verify server is running
- `create_project` - Create new projects
- `list_projects` - List all projects
- `get_project_by_id` - Get specific project details
- `remove_project` - Delete projects
- `create_note` - Add notes to projects
- `list_notes` - Retrieve all notes for a project

### Tech Stack

- TypeScript 5.9+ with Node16 ESM
- Zod v4.3+ for validation
- mysql2 v3.16+ for database
- @modelcontextprotocol/sdk v1.25+
- ESLint v9.35+ & Prettier v3.6+
