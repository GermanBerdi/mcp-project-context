import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const listByProjectIdReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ project_id: true }).shape)
  .describe(
    "Lists all Postman configurations for a project. Required field: 'project_id' (positive integer). Returns an array of configurations for the specified project.",
  );
