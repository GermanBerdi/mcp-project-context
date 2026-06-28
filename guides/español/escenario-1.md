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

3. **Agregar el servidor MCP** (con `--scope user` para que esté disponible en todos los proyectos):

   ```bash
   claude mcp add --scope user project-context -- /ruta/a/node /ruta/a/mcp-project-context/build/index.js
   ```

4. **Comprobar que está en la lista**:

   ```bash
   claude mcp list
   ```

   Deberías ver `project-context` con estado `✔ Connected`.

5. **Verificar el archivo de configuración**:
   - La configuración se guarda en `~/.claude.json`

6. **Reiniciar la sesión de Claude Code**:
   - Presiona `Ctrl+Shift+P` y ejecuta "Developer: Reload Window" para que VS Code detecte el nuevo servidor MCP
