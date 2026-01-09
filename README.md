# MCP Project Context

Servidor MCP (Model Context Protocol) para gestionar contexto y notas de diferentes proyectos.

## 🎯 ¿Qué es?

Este servidor MCP te permite almacenar y acceder a notas de contexto de diferentes proyectos directamente desde VS Code (o cualquier otro cliente MCP). Es como tener un sistema de notas inteligente que puedes consultar mientras trabajas con IA.

## 💡 ¿Para qué sirve?

Imagina que estás trabajando en múltiples proyectos y quieres que tu asistente de IA tenga acceso a:
- Notas de arquitectura del proyecto
- Decisiones técnicas importantes
- Contexto de negocio
- Convenciones de código
- TODOs y tareas pendientes

En lugar de copiar y pegar estas notas cada vez, este servidor MCP las hace accesibles automáticamente.

## 🏗️ Características

- **Gestión de notas por proyecto**: Organiza notas por proyecto
- **CRUD completo**: Crear, leer, actualizar y eliminar notas
- **Búsqueda**: Encuentra notas rápidamente
- **Categorías**: Organiza notas por tipo (arquitectura, decisiones, contexto, etc.)
- **Integración con VS Code**: Accede a tus notas desde GitHub Copilot

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd mcp-project-context

# Instalar dependencias
npm install

# Compilar
npm run build
```

## 📝 Uso

### Configurar en VS Code

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

### Herramientas (Tools) disponibles

- `create_note`: Crear una nota nueva para un proyecto
- `read_note`: Leer una nota específica
- `update_note`: Actualizar una nota existente
- `delete_note`: Eliminar una nota
- `list_notes`: Listar todas las notas de un proyecto
- `search_notes`: Buscar notas por contenido

## 🗂️ Estructura de datos

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

## 🛠️ Desarrollo

```bash
# Modo watch (recompila automáticamente)
npm run watch

# Compilar
npm run build
```

## 📋 Roadmap

- [ ] Implementación básica del servidor
- [ ] Sistema de almacenamiento de notas
- [ ] Herramientas CRUD
- [ ] Sistema de búsqueda
- [ ] Integración con Git (leer commits, branches)
- [ ] Exportar/importar notas
- [ ] UI web para gestión de notas

## 📄 Licencia

MIT

---

**Nota**: Este proyecto está en desarrollo activo.
