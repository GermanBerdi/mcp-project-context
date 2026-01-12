import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const createReqSchema = z
  .object({})
  .extend(rowSchema.fields.omit({ id: true, created_at: true, updated_at: true }).shape)
  .describe(
    "Creates a new database connection for a project. Required fields: project_id (integer), connection_name (string), connection_type (enum), host (string), port (integer), database_name (string), username (string). Optional: password (string), extra_config (JSON object).",
  );
