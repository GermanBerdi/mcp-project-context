# Scenario 2
- mcp-project-context is cloned in WSL
- Enable it for Claude Code from Windows

> **Why manual?** You could use the Claude Code CLI (`claude mcp add`) as in Scenario 1, but that requires installing Node.js and npm on Windows. If you're developing from WSL, it doesn't make sense to install them just to register the server. That's why this guide uses a manual process that requires no additional installations.

1. **Locate the Claude Code configuration file**:
   - Open `%USERPROFILE%\.claude.json` (usually `C:\Users\YOUR_USER\.claude.json`)

2. **Add the MCP server configuration**:
   - Add the `mcpServers` block to the JSON:

   ```json
   "mcpServers": {
       "project-context": {
         "type": "stdio",
         "command": "wsl",
         "args": [
           "/path/in/wsl/to/node",
           "/path/in/wsl/to/mcp-project-context/build/index.js"
         ]
       }
     }
   ```

   > **Note:** `wsl` is used as the command so Windows can execute `node` inside WSL. The paths must be WSL (Linux) paths, not Windows paths.

3. **Restart the Claude Code session**:
   - Press `Ctrl+Shift+P` and run "Reload Window" so VS Code detects the new MCP server

4. **Verify it works**:
   - Ask Claude Code: "use health_check to verify the server"
   - You should receive a response confirming the server is active
