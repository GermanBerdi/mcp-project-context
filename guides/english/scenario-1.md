# Scenario 1

- mcp-project-context is cloned in WSL
- Enable it for Claude Code from WSL

1. **Install the Claude Code CLI**:

   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Check the CLI version**:

   ```bash
   claude --version
   ```

3. **Add the MCP server** (with `--scope user` so it's available in all projects):

   ```bash
   claude mcp add --scope user project-context -- /path/to/node /path/to/mcp-project-context/build/index.js
   ```

4. **Check it's in the list**:

   ```bash
   claude mcp list
   ```

   You should see `project-context` with status `✔ Connected`.

5. **Verify the configuration file**:
   - The configuration is saved in `~/.claude.json`

6. **Restart the Claude Code session**:
   - Press `Ctrl+Shift+P` and run "Reload Window" so VS Code detects the new MCP server
