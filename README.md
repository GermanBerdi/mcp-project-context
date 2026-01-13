# MCP Project Context

[English](#english) | [Español](#español)

---

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

# Install dependencies
npm install

# Create .env file with your configuration
cp .env.example .env
# Edit .env and add your database credentials and API keys

# Build
npm run build
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

### 📝 Usage

#### Configure in VS Code

**Prerequisites:**

- Your organization must have MCP (Model Context Protocol) enabled for your account
- Have GitHub Copilot extension installed in VS Code

**Step-by-step to add the MCP server:**

1. **Open the command palette**:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)

2. **Search for the MCP command**:
   - Type "MCP: Add Server" and select it

3. **Configure the server**:
   - Server name: `project-context`
   - Type: `stdio`
   - Command and arguments depending on your environment:

**For Windows (running from WSL):**

```json
{
  "servers": {
    "project-context": {
      "type": "stdio",
      "command": "wsl",
      "args": ["node", "/home/YOUR_USER/path/to/mcp-project-context/build/index.js"]
    }
  }
}
```

**For Linux/macOS or direct WSL:**

```json
{
  "servers": {
    "project-context": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/mcp-project-context/build/index.js"]
    }
  }
}
```

4. **Verify the configuration**:
   - The file is automatically saved to:
     - Windows: `C:\Users\YOUR_USER\AppData\Roaming\Code\User\mcp.json`
     - Linux/macOS: `~/.config/Code/User/mcp.json`

5. **Verify the server is active**:
   - Go to the extensions view in VS Code
   - Look for the **"MCP SERVERS"** section
   - You should see `project-context` listed there
   - If it shows an error icon, verify the paths and that the build is up to date

6. **Allow server usage**:
   - The first time Copilot uses a server tool, it will ask for permission
   - You can select "Allow" or "Always Allow" to avoid confirming each time

7. **Test that it works**:
   - Open GitHub Copilot chat
   - Ask: "use hello_world to greet someone"
   - If everything is configured correctly, you'll receive a greeting from the server

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

### 🔧 Postman Integration Setup

The Postman integration allows you to manage your API collections directly from your MCP client.

**Setup Flow:**

**Option 1 - Complete setup from scratch:**

1. Configure `POSTMAN_API_KEY` in your `.env` file
2. List available workspaces using `list_postman_workspaces`
3. Create a new collection using `create_postman_collection` (name, description, workspace_id)
4. Create project configuration using `create_postman_configuration` (project_id, configuration_name, api_key, workspace_id, collection_id)

**Option 2 - With existing workspace and collection:**

1. Get your workspace and collection IDs from Postman
2. Use `list_postman_workspaces` and `list_postman_collections` to find them
3. Create configuration directly with `create_postman_configuration`

**Example conversation with Copilot:**

```
You: "List my Postman workspaces"
Copilot: [Shows available workspaces]

You: "Create a new collection named 'MyProject API' in workspace [workspace-id]"
Copilot: [Creates collection and shows the ID]

You: "Create Postman configuration for project 1 using that collection"
Copilot: [Links project with Postman]
```

### 🗂️ Data Structure

**Projects:**

```json
{
  "id": 1,
  "project_name": "MyProject",
  "description": "Project description",
  "project_status": "active",
  "created_at": "2026-01-13T...",
  "updated_at": "2026-01-13T..."
}
```

**Notes:**

```json
{
  "id": 1,
  "project_id": 1,
  "content": "Important project note...",
  "created_at": "2026-01-13T...",
  "updated_at": "2026-01-13T..."
}
```

**Database Connections:**

```json
{
  "id": 1,
  "project_id": 1,
  "connection_name": "production-db",
  "connection_type": "mysql",
  "host": "localhost",
  "port": 3306,
  "database_name": "mydb",
  "username": "user",
  "password": "encrypted",
  "extra_config": { "ssl": true }
}
```

**Postman Configurations:**

```json
{
  "id": 1,
  "project_id": 1,
  "configuration_name": "main-api",
  "api_key": "PMAK-...",
  "workspace_id": "uuid-...",
  "collection_id": "uuid-...",
  "extra_config": null
}
```

### 🛠️ Development

```bash
# Watch mode (auto-recompile)
npm run watch

# Build
npm run build
```

### 📋 Roadmap

- [x] Basic MCP server implementation
- [x] MySQL database integration
- [x] Project management (CRUD)
- [x] Notes system per project
- [x] Database connections management
- [x] SQL query execution
- [x] Postman workspace integration
- [x] Postman collection management
- [ ] HTTP request tool (generic API calls)
- [ ] Jira integration
- [ ] General notes (not tied to specific projects)
- [ ] Git integration (commits, branches)
- [ ] Web UI for management

### 📄 License

MIT

---

**Note**: This project is under active development.

---

## Español

Servidor MCP (Model Context Protocol) para gestionar contexto y notas de diferentes proyectos.

### 🎯 ¿Qué es?

Este servidor MCP te permite almacenar y acceder a notas de contexto de diferentes proyectos directamente desde VS Code (o cualquier otro cliente MCP). Es como tener un sistema de notas inteligente que puedes consultar mientras trabajas con IA.

### 💡 ¿Para qué sirve?

Imagina que estás trabajando en múltiples proyectos y quieres que tu asistente de IA tenga acceso a:

- Notas de arquitectura del proyecto
- Decisiones técnicas importantes
- Contexto de negocio
- Convenciones de código
- TODOs y tareas pendientes

En lugar de copiar y pegar estas notas cada vez, este servidor MCP las hace accesibles automáticamente.

### 🏗️ Características

- **Gestión de Proyectos**: Crea y gestiona múltiples proyectos con sus configuraciones
- **Sistema de Notas**: Notas por proyecto para mantener contexto entre sesiones
- **Conexiones a Base de Datos**: Almacena y gestiona configuraciones de conexión por proyecto
- **Integración con Postman**: Conecta proyectos con workspaces y colecciones de Postman
- **Ejecución SQL**: Ejecuta consultas SQL directamente desde tu cliente MCP
- **Integración con VS Code**: Accede a todas las funcionalidades desde GitHub Copilot

### 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/GermanBerdi/mcp-project-context.git
cd mcp-project-context

# Instalar dependencias
npm install

# Crear archivo .env con tu configuración
cp .env.example .env
# Editar .env y agregar tus credenciales de base de datos y API keys

# Compilar
npm run build
```

### ⚙️ Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Configuración de Base de Datos
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=mcp_project_context

# API de Postman (Opcional - solo si quieres usar integración con Postman)
POSTMAN_API_KEY=tu_api_key_de_postman
```

**Obtener tu API Key de Postman:**

1. Ve a [Postman](https://www.postman.com/)
2. Click en tu perfil → Settings → API Keys
3. Genera una nueva API key
4. Cópiala y pégala en tu archivo `.env`

### 📝 Uso

#### Configurar en VS Code

**Requisitos previos:**

- Tu organización debe tener habilitado MCP (Model Context Protocol) para tu cuenta
- Tener instalada la extensión de GitHub Copilot en VS Code

**Paso a paso para agregar el servidor MCP:**

1. **Abrir la paleta de comandos**:
   - Presiona `Ctrl+Shift+P` (Windows/Linux) o `Cmd+Shift+P` (macOS)

2. **Buscar el comando MCP**:
   - Escribe "MCP: Add Server" y selecciónalo

3. **Configurar el servidor**:
   - Nombre del servidor: `project-context`
   - Tipo: `stdio`
   - Comando y argumentos según tu entorno:

**Para Windows (ejecutando desde WSL):**

```json
{
  "servers": {
    "project-context": {
      "type": "stdio",
      "command": "wsl",
      "args": ["node", "/home/TU_USUARIO/ruta/a/mcp-project-context/build/index.js"]
    }
  }
}
```

**Para Linux/macOS o WSL directo:**

```json
{
  "servers": {
    "project-context": {
      "type": "stdio",
      "command": "node",
      "args": ["/ruta/absoluta/a/mcp-project-context/build/index.js"]
    }
  }
}
```

4. **Verificar la configuración**:
   - El archivo se guarda automáticamente en:
     - Windows: `C:\Users\TU_USUARIO\AppData\Roaming\Code\User\mcp.json`
     - Linux/macOS: `~/.config/Code/User/mcp.json`

5. **Verificar que el servidor está activo**:
   - Ve a la vista de extensiones en VS Code
   - Busca la sección **"MCP SERVERS"**
   - Deberías ver `project-context` listado allí
   - Si aparece con un ícono de error, verifica los paths y que el build esté actualizado

6. **Permitir el uso del servidor**:
   - La primera vez que Copilot use una herramienta del servidor, te pedirá permiso
   - Puedes seleccionar "Allow" o "Always Allow" para no tener que confirmar cada vez

7. **Probar que funciona**:
   - Abre el chat de GitHub Copilot
   - Pregunta: "usa hello_world para saludar a alguien"
   - Si todo está bien configurado, recibirás un saludo del servidor

#### Herramientas disponibles

**Gestión de Proyectos:**

- `health_check`: Verificar que el servidor está funcionando correctamente
- `create_project`: Crear un nuevo proyecto
- `list_projects`: Listar todos los proyectos disponibles
- `get_project_by_id`: Obtener detalles de un proyecto específico
- `remove_project`: Eliminar un proyecto

**Gestión de Notas:**

- `create_note`: Crear una nueva nota para un proyecto
- `list_notes`: Listar todas las notas de un proyecto

**Conexiones a Base de Datos:**

- `create_database_connection`: Agregar una conexión de base de datos a un proyecto
- `list_database_connections`: Listar todas las conexiones de base de datos de un proyecto
- `execute_sql`: Ejecutar consultas SQL usando una conexión configurada

**Integración con Postman:**

- `list_postman_workspaces`: Listar todos los workspaces de Postman disponibles
- `list_postman_collections`: Listar colecciones en un workspace específico
- `create_postman_collection`: Crear una nueva colección en un workspace
- `create_postman_configuration`: Vincular un proyecto con workspace y colección de Postman
- `list_postman_configurations`: Listar configuraciones de Postman para un proyecto

### 🔧 Setup de Integración con Postman

La integración con Postman te permite gestionar tus colecciones de API directamente desde tu cliente MCP.

**Flujo de Setup:**

**Opción 1 - Setup completo desde cero:**

1. Configura `POSTMAN_API_KEY` en tu archivo `.env`
2. Lista los workspaces disponibles usando `list_postman_workspaces`
3. Crea una nueva colección usando `create_postman_collection` (nombre, descripción, workspace_id)
4. Crea la configuración del proyecto usando `create_postman_configuration` (project_id, configuration_name, api_key, workspace_id, collection_id)

**Opción 2 - Con workspace y colección existentes:**

1. Obtén tus IDs de workspace y colección desde Postman
2. Usa `list_postman_workspaces` y `list_postman_collections` para encontrarlos
3. Crea la configuración directamente con `create_postman_configuration`

**Ejemplo de conversación con Copilot:**

```
Tú: "Lista mis workspaces de Postman"
Copilot: [Muestra los workspaces disponibles]

Tú: "Crea una nueva colección llamada 'API de MiProyecto' en el workspace [workspace-id]"
Copilot: [Crea la colección y muestra el ID]

Tú: "Crea la configuración de Postman para el proyecto 1 usando esa colección"
Copilot: [Vincula el proyecto con Postman]
```

### 🗂️ Estructura de datos

**Proyectos:**

```json
{
  "id": 1,
  "project_name": "MiProyecto",
  "description": "Descripción del proyecto",
  "project_status": "active",
  "created_at": "2026-01-13T...",
  "updated_at": "2026-01-13T..."
}
```

**Notas:**

```json
{
  "id": 1,
  "project_id": 1,
  "content": "Nota importante del proyecto...",
  "created_at": "2026-01-13T...",
  "updated_at": "2026-01-13T..."
}
```

**Conexiones a Base de Datos:**

```json
{
  "id": 1,
  "project_id": 1,
  "connection_name": "production-db",
  "connection_type": "mysql",
  "host": "localhost",
  "port": 3306,
  "database_name": "mibd",
  "username": "usuario",
  "password": "encriptada",
  "extra_config": { "ssl": true }
}
```

**Configuraciones de Postman:**

```json
{
  "id": 1,
  "project_id": 1,
  "configuration_name": "main-api",
  "api_key": "PMAK-...",
  "workspace_id": "uuid-...",
  "collection_id": "uuid-...",
  "extra_config": null
}
```

### 🛠️ Desarrollo

```bash
# Modo watch (recompila automáticamente)
npm run watch

# Compilar
npm run build
```

### 📋 Roadmap

- [x] Implementación básica del servidor MCP
- [x] Integración con base de datos MySQL
- [x] Gestión de proyectos (CRUD)
- [x] Sistema de notas por proyecto
- [x] Gestión de conexiones a base de datos
- [x] Ejecución de consultas SQL
- [x] Integración con workspaces de Postman
- [x] Gestión de colecciones de Postman
- [ ] Herramienta HTTP request (llamadas genéricas a APIs)
- [ ] Integración con Jira
- [ ] Notas generales (no vinculadas a proyectos específicos)
- [ ] Integración con Git (commits, branches)
- [ ] Interfaz web para gestión

### 📄 Licencia

MIT

---

**Nota**: Este proyecto está en desarrollo activo.
