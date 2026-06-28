# Escenario 1
- mcp-project-context está clonado en WSL
- Habilitarlo para Claude Code desde WSL

1. **Instalar la CLI de Claude Code**:

   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Comprobar la versión de la CLI**:

   ```bash
   claude --version
   ```

3. **Agregar el servidor MCP**:

   ```bash
   claude mcp add project-context -- /ruta/a/node /ruta/a/mcp-project-context/build/index.js
   ```

4. **Comprobar que está en la lista**:

   ```bash
   claude mcp list
   ```

   Deberías ver `project-context` con estado `✔ Connected`.

5. **Verificar el archivo de configuración**:
   - La configuración se guarda en `~/.claude.json`
