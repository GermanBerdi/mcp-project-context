import { z } from "zod";

export const listCollectionsReqSchema = z
  .object({
    workspace_id: z.uuid(),
  })
  .describe(
    "Lists all Postman collections for a workspace. Required field: 'workspace_id' (UUID). Returns an array of collections for the specified workspace.",
  );
