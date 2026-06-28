# Escenario 3

- mcp-project-context está clonado en WSL
- Habilitarlo para GitHub Copilot (VS Code) desde WSL

> **Nota:** La configuración MCP de usuario en VS Code para Copilot es compartida entre WSL y Windows. Los pasos del [Escenario 3](escenario-3.md) habilitan el acceso al servidor MCP para GitHub Copilot tanto desde WSL como desde Windows.

1. **Abrir la configuración MCP de usuario en VS Code**:
   - Presiona `Ctrl+Shift+P` y ejecuta "MCP: Open User Configuration"
   - Esto abre el archivo `%APPDATA%\Code\User\mcp.json` (normalmente `C:\Users\TU_USUARIO\AppData\Roaming\Code\User\mcp.json`)

2. **Agregar la configuración del servidor MCP**:
   - Pegar el siguiente bloque en el archivo de configuración:

   ```json
   {
     "servers": {
       "project-context": {
         "type": "stdio",
         "command": "wsl",
         "args": [
           "/home/<usuario>/.nvm/versions/node/v<XX.XX.X>/bin/node",
           "/home/<usuario>/Development/mcp-project-context/build/index.js"
         ]
       }
     }
   }
   ```

   > **Nota:** Sustituye `<usuario>` por tu usuario de WSL y `<XX.XX.X>` por tu versión de Node (puedes verla con `node --version`). Las rutas deben ser rutas de WSL (Linux), no de Windows.

3. **Iniciar el servidor MCP**:
   - En la barra lateral de VS Code, en el apartado **MCP SERVERS**, debería aparecer el servidor configurado
   - Clic derecho sobre `project-context` y seleccionar **Start**

4. **Verificar que funciona**:
   - Se abrirá una ventana en la pestaña **OUTPUT** donde se puede ver la consola de inicio del servidor MCP
   - Deberías ver un log similar a:

   ```
   [info] Starting server project-context
   [info] Connection state: Running
   [info] Discovered 22 tools
   ```
