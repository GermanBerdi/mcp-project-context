import { z } from "zod";

const listWorkspaceItemSchema = z
  .object({
    id: z.uuid().describe("The UUID of the Postman workspace."),
    name: z.string().describe("The name of the Postman workspace."),
    type: z.string().describe("The type of workspace (e.g., 'team', 'personal')."),
    visibility: z.string().describe("The visibility of the workspace (e.g., 'team', 'personal')."),
    createdBy: z.string().describe("The user ID of the creator of the workspace."),
    about: z.string().optional().describe("Optional description or additional information about the workspace."),
  })
  .describe("Represents a single Postman workspace returned by the API.");

export const listWorkspacesResSchema = z
  .object({
    workspaces: z.array(listWorkspaceItemSchema).describe("Array of Postman workspaces accessible to the user."),
  })
  .describe(
    "Response schema for listing Postman workspaces. Contains an array of workspace objects with details such as id, name, type, visibility, creator, and optional description.",
  );
