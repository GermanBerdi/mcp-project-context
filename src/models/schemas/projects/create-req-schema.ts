import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const createReqSchema = z
  .object({})
  .extend(rowSchema.fields.omit({ id: true, project_status: true, created_at: true, updated_at: true }).shape)
  .extend({
    project_status: rowSchema.project_status.optional().describe("The initial status of the project. Defaults to 'active' if not specified. Possible values are: 'active', 'paused', 'archived', 'completed'"),
  })
  .describe(
    "Creates a new project in the database. Required fields: 'project_name' (string, 1-255 chars, e.g. 'E-commerce API'), 'description' (string, detailed project goals). Optional: 'project_status' (defaults to 'active', can be 'active', 'paused', 'completed', or 'archived').",
  );
