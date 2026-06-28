# MCP Project Context

## English

MCP (Model Context Protocol) server for managing context and notes across different projects.

### 🎯 What is it?

This MCP server allows you to store and access context notes from different projects directly from VS Code (or any other MCP client). It's like having an intelligent note-taking system that you can query while working with AI.

### 💡 What is it for?

Imagine you're working on multiple projects and want your AI assistant to have access to:

- Project architecture notes
- Important technical decisions
- Business context
- Code conventions
- TODOs and pending tasks

Instead of copying and pasting these notes every time, this MCP server makes them automatically accessible.

### 🏗️ Features

- **Project Management**: Create and manage multiple projects with their configurations
- **Notes System**: Project-based notes for maintaining context across sessions
- **Database Connections**: Store and manage database connection configurations per project
- **Postman Integration**: Connect projects with Postman workspaces and collections
- **SQL Execution**: Execute SQL queries directly from your MCP client
- **VS Code Integration**: Access all features from GitHub Copilot

### 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/GermanBerdi/mcp-project-context.git
cd mcp-project-context
```

### ⚙️ Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=mcp_project_context

# Postman API (Optional - only if you want to use Postman integration)
POSTMAN_API_KEY=your_postman_api_key
```

**Getting your Postman API Key:**

1. Go to [Postman](https://www.postman.com/)
2. Click on your profile → Settings → API Keys
3. Generate a new API key
4. Copy and paste it into your `.env` file

### 📦 Install dependencies and build

```bash
npm install
```

> **Note:** This command will install the dependencies and automatically build the project, generating the `build/` folder. This folder contains the MCP server that will be consumed by the AI agent.

### 📝 Usage

#### Configure in VS Code

**Prerequisites:**

- Your organization must have MCP (Model Context Protocol) enabled for your account
- Have GitHub Copilot extension installed in VS Code

##### Scenario 1

- mcp-project-context is cloned in WSL
- Enable it for Claude Code from WSL
- [See step-by-step guide](guides/english/scenario-1.md)

##### Scenario 2

- mcp-project-context is cloned in WSL
- Enable it for Claude Code from Windows
- [See step-by-step guide](guides/english/scenario-2.md)

##### Scenario 3

- mcp-project-context is cloned in WSL
- Enable it for Copilot from WSL
- [See step-by-step guide](guides/english/scenario-3.md)

##### Scenario 4

- mcp-project-context is cloned in WSL
- Enable it for Copilot from Windows
- [See step-by-step guide](guides/english/scenario-4.md)

##### Scenario 5

- mcp-project-context is cloned in Windows
- Enable it for Claude Code from WSL
- [See step-by-step guide](guides/english/scenario-5.md)

##### Scenario 6

- mcp-project-context is cloned in Windows
- Enable it for Claude Code from Windows
- [See step-by-step guide](guides/english/scenario-6.md)

##### Scenario 7

- mcp-project-context is cloned in Windows
- Enable it for Copilot from WSL
- [See step-by-step guide](guides/english/scenario-7.md)

##### Scenario 8

- mcp-project-context is cloned in Windows
- Enable it for Copilot from Windows
- [See step-by-step guide](guides/english/scenario-8.md)

#### Available Tools

**Project Management:**

- `health_check`: Verify the server is running correctly
- `create_project`: Create a new project
- `list_projects`: List all available projects
- `get_project_by_id`: Get details of a specific project
- `remove_project`: Delete a project

**Notes Management:**

- `create_note`: Create a new note for a project
- `list_notes`: List all notes from a project

**Database Connections:**

- `create_database_connection`: Add a database connection to a project
- `list_database_connections`: List all database connections for a project
- `execute_sql`: Execute SQL queries using a configured connection

**Postman Integration:**

- `list_postman_workspaces`: List all available Postman workspaces
- `list_postman_collections`: List collections in a specific workspace
- `create_postman_collection`: Create a new collection in a workspace
- `create_postman_configuration`: Link a project with Postman workspace and collection
- `list_postman_configurations`: List Postman configurations for a project

#### Postman Integration Setup

The Postman integration allows you to manage your API collections directly from your MCP client.

##### Scenario 1

- Complete setup from scratch
- [See step-by-step guide](guides/english/postman-scenario-1.md)

##### Scenario 2

- With existing workspace and collection
- [See step-by-step guide](guides/english/postman-scenario-2.md)

### 📄 License

MIT
