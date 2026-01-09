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

Add this server to your MCP configuration in VS Code (`mcp.json`):

```json
{
  "mcpServers": {
    "project-context": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-project-context/build/index.js"]
    }
  }
}
```

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

Agrega este servidor a tu configuración de MCP en VS Code (`mcp.json`):

```json
{
  "mcpServers": {
    "project-context": {
      "command": "node",
      "args": ["/ruta/absoluta/a/mcp-project-context/build/index.js"]
    }
  }
}
```

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
