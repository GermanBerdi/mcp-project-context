import { z } from "zod";

export const workspaceSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  type: z.string(),
  visibility: z.string(),
  createdBy: z.string(),
  about: z.string().optional(),
});

export const listWorkspacesResSchema = z.object({
  workspaces: z.array(workspaceSchema),
});
