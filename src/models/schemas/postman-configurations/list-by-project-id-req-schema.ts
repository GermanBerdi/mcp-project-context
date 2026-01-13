import { z } from "zod";

export const listByProjectIdReqSchema = z.object({
  project_id: z.number().positive(),
});
