import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const createReqSchema = z
  .object({})
  .extend(rowSchema.fields.omit({ id: true, created_at: true, updated_at: true }).shape)
  .describe(
    "Creates a new Postman configuration for a project. Each configuration represents a workspace + collection association. A project can have multiple configurations, typically one per Postman collection used for API development. Required fields: project_id (integer), configuration_name (string), api_key (string), workspace_id (UUID). Optional: collection_id (UUID), extra_config (JSON object).",
  );
