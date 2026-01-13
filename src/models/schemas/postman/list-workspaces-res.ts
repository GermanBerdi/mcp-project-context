import { z } from "zod";

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  visibility: z.string(),
  createdBy: z.string(),
  about: z.string().optional(),
});

export const ListWorkspacesResSchema = z.object({
  workspaces: z.array(WorkspaceSchema),
});
