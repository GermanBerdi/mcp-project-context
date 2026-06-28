# Scenario 3

- mcp-project-context is cloned in WSL
- Enable it for GitHub Copilot (VS Code) from WSL

> **Note:** The VS Code user MCP configuration for Copilot is shared between WSL and Windows. The steps in [Scenario 3](scenario-3.md) enable MCP server access for GitHub Copilot from both WSL and Windows.

1. **Open the VS Code user MCP configuration**:
   - Press `Ctrl+Shift+P` and run "MCP: Open User Configuration"
   - This opens the file `%APPDATA%\Code\User\mcp.json` (usually `C:\Users\YOUR_USER\AppData\Roaming\Code\User\mcp.json`)

2. **Add the MCP server configuration**:
   - Paste the following block into the configuration file:

   ```json
   {
     "servers": {
       "project-context": {
         "type": "stdio",
         "command": "wsl",
         "args": [
           "/home/<user>/.nvm/versions/node/v<XX.XX.X>/bin/node",
           "/home/<user>/Development/mcp-project-context/build/index.js"
         ]
       }
     }
   }
   ```

   > **Note:** Replace `<user>` with your WSL username and `<XX.XX.X>` with your Node version (you can check it with `node --version`). Paths must be WSL (Linux) paths, not Windows paths.

3. **Start the MCP server**:
   - In the VS Code sidebar, under the **MCP SERVERS** section, the configured server should appear
   - Right-click on `project-context` and select **Start**

4. **Verify it works**:
   - An OUTPUT tab will open where you can see the MCP server startup log
   - You should see a log similar to:

   ```
   [info] Starting server project-context
   [info] Connection state: Running
   [info] Discovered 22 tools
   ```
