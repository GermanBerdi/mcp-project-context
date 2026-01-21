import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const updateReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ id: true }).shape)
  .extend({
    project_name: rowSchema.project_name.optional(),
    description: rowSchema.description.optional(),
    project_status: rowSchema.project_status.optional(),
  })
  .describe(
    "Updates an existing project in the database. Required: 'id' (number). Optional: 'project_name' (string, 1-255 chars), 'description' (string or null), 'project_status' ('active', 'paused', 'archived', 'completed'). At least one optional field must be provided.",
  );
