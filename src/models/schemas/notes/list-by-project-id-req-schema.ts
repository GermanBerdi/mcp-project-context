import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const listByProjectIdReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ project_id: true }).shape)
  .describe(
    "Lists all notes associated with a specific project. Required field: 'project_id' (positive integer). Returns an array of all notes for that project.",
  );
