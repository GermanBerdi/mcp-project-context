import { z } from "zod";

export const listCollectionsReqSchema = z.object({
  workspace_id: z.uuid(),
});
