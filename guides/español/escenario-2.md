# Escenario 2

- mcp-project-context está clonado en WSL
- Habilitarlo para Claude Code desde Windows

> **¿Por qué manual?** Se podría usar la CLI de Claude Code (`claude mcp add`) como en el Escenario 1, pero eso requiere instalar Node.js y npm en Windows. Si la idea es programar desde WSL, no tiene sentido instalarlos solo para registrar el servidor. Por eso aquí se opta por un proceso manual que no requiere instalaciones adicionales.

1. **Localizar el archivo de configuración de Claude Code**:
   - Abrir `%USERPROFILE%\.claude.json` (normalmente `C:\Users\TU_USUARIO\.claude.json`)

2. **Agregar la configuración del servidor MCP**:
   - Añadir el bloque `mcpServers` al JSON:

   ```json
   "mcpServers": {
       "project-context": {
         "type": "stdio",
         "command": "wsl",
         "args": [
           "/ruta/en/wsl/a/node",
           "/ruta/en/wsl/a/mcp-project-context/build/index.js"
         ]
       }
     }
   ```

   > **Nota:** Se usa `wsl` como comando para que Windows pueda ejecutar `node` dentro de WSL. Las rutas deben ser rutas de WSL (Linux), no de Windows.

3. **Reiniciar la sesión de Claude Code**:
   - Presiona `Ctrl+Shift+P` y ejecuta "Reload Window" para que VS Code detecte el nuevo servidor MCP

4. **Verificar que funciona**:
   - Pide a Claude Code: "usa health_check para verificar el servidor"
   - Deberías recibir una respuesta confirmando que el servidor está activo
