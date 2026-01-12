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

- **Project-based note management**: Organize notes by project
- **Complete CRUD**: Create, read, update and delete notes
- **Search**: Find notes quickly
- **Categories**: Organize notes by type (architecture, decisions, context, etc.)
- **VS Code Integration**: Access your notes from GitHub Copilot

### 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/GermanBerdi/mcp-project-context.git
cd mcp-project-context

# Install dependencies
npm install

# Build
npm run build
```

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

- `create_note`: Create a new note for a project
- `read_note`: Read a specific note
- `update_note`: Update an existing note
- `delete_note`: Delete a note
- `list_notes`: List all notes from a project
- `search_notes`: Search notes by content

### 🗂️ Data Structure

Notes are stored locally in JSON format with the following structure:

```json
{
  "project": "project-name",
  "category": "architecture",
  "title": "Database decision",
  "content": "We decided to use PostgreSQL because...",
  "tags": ["database", "backend"],
  "createdAt": "2026-01-09T...",
  "updatedAt": "2026-01-09T..."
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

- [ ] Basic server implementation
- [ ] Note storage system
- [ ] CRUD tools
- [ ] Search system
- [ ] Git integration (read commits, branches)
- [ ] Export/import notes
- [ ] Web UI for note management

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

- **Gestión de notas por proyecto**: Organiza notas por proyecto
- **CRUD completo**: Crear, leer, actualizar y eliminar notas
- **Búsqueda**: Encuentra notas rápidamente
- **Categorías**: Organiza notas por tipo (arquitectura, decisiones, contexto, etc.)
- **Integración con VS Code**: Accede a tus notas desde GitHub Copilot

### 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/GermanBerdi/mcp-project-context.git
cd mcp-project-context

# Instalar dependencias
npm install

# Compilar
npm run build
```

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

- `create_note`: Crear una nota nueva para un proyecto
- `read_note`: Leer una nota específica
- `update_note`: Actualizar una nota existente
- `delete_note`: Eliminar una nota
- `list_notes`: Listar todas las notas de un proyecto
- `search_notes`: Buscar notas por contenido

### 🗂️ Estructura de datos

Las notas se almacenan localmente en formato JSON con la siguiente estructura:

```json
{
  "project": "nombre-del-proyecto",
  "category": "arquitectura",
  "title": "Decisión sobre base de datos",
  "content": "Decidimos usar PostgreSQL porque...",
  "tags": ["database", "backend"],
  "createdAt": "2026-01-09T...",
  "updatedAt": "2026-01-09T..."
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

- [ ] Implementación básica del servidor
- [ ] Sistema de almacenamiento de notas
- [ ] Herramientas CRUD
- [ ] Sistema de búsqueda
- [ ] Integración con Git (leer commits, branches)
- [ ] Exportar/importar notas
- [ ] UI web para gestión de notas

### 📄 Licencia

MIT

---

**Nota**: Este proyecto está en desarrollo activo.
