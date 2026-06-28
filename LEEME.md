# MCP Project Context

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

### 🔨 Compilar

```bash
npm run build
```

### 📝 Uso

#### Configurar en VS Code

**Requisitos previos:**

- Tu organización debe tener habilitado MCP (Model Context Protocol) para tu cuenta
- Tener instalada la extensión de GitHub Copilot en VS Code

##### Escenario 1
- mcp-project-context está clonado en WSL
- Habilitarlo para Claude Code desde WSL
- [Ver guía paso a paso](guides/español/escenario-1.md)

##### Escenario 2
- mcp-project-context está clonado en WSL
- Habilitarlo para Claude Code desde Windows
- [Ver guía paso a paso](guides/español/escenario-2.md)

##### Escenario 3
- mcp-project-context está clonado en WSL
- Habilitarlo para Copilot desde WSL
- [Ver guía paso a paso](guides/español/escenario-3.md)

##### Escenario 4
- mcp-project-context está clonado en WSL
- Habilitarlo para Copilot desde Windows
- [Ver guía paso a paso](guides/español/escenario-4.md)

##### Escenario 5
- mcp-project-context está clonado en Windows
- Habilitarlo para Claude Code desde WSL
- [Ver guía paso a paso](guides/español/escenario-5.md)

##### Escenario 6
- mcp-project-context está clonado en Windows
- Habilitarlo para Claude Code desde Windows
- [Ver guía paso a paso](guides/español/escenario-6.md)

##### Escenario 7
- mcp-project-context está clonado en Windows
- Habilitarlo para Copilot desde WSL
- [Ver guía paso a paso](guides/español/escenario-7.md)

##### Escenario 8
- mcp-project-context está clonado en Windows
- Habilitarlo para Copilot desde Windows
- [Ver guía paso a paso](guides/español/escenario-8.md)

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

#### Configurar Integración con Postman

La integración con Postman te permite gestionar tus colecciones de API directamente desde tu cliente MCP.

##### Escenario 1
- Setup completo desde cero
- [Ver guía paso a paso](guides/español/postman-escenario-1.md)

##### Escenario 2
- Con workspace y colección existentes
- [Ver guía paso a paso](guides/español/postman-escenario-2.md)

### 📄 Licencia

MIT
