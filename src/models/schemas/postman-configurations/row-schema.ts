import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

const id = commonSchema.id.describe(
  "The unique numeric identifier of the Postman configuration, used to reference a specific configuration record in the database.",
);

const project_id = commonSchema.id.describe(
  "The unique numeric identifier of the project this Postman configuration belongs to. Must be a valid project ID that exists in the projects table.",
);

const configuration_name = z
  .string()
  .min(1)
  .max(255)
  .describe(
    "The name/alias for this Postman configuration (e.g., 'main-api', 'admin-collection'). Must be unique within the project.",
  );

const api_key = z.string().min(1).max(512).describe("The Postman API key used for authentication with Postman API.");

const workspace_id = z.uuid().describe("The UUID of the Postman workspace associated with this configuration.");

const collection_id = z
  .uuid()
  .nullable()
  .describe("The UUID of the Postman collection. Optional - can be null if no specific collection is associated.");

const extra_config = z
  .any()
  .nullable()
  .describe(
    "Additional configuration as JSON. Can store extra metadata or settings. Use null if no extra configuration is needed.",
  );

const created_at = z.date().describe("The timestamp when the configuration was created.");

const updated_at = z.date().describe("The timestamp when the configuration was last updated.");

const fields = z
  .object({
    id,
    project_id,
    configuration_name,
    api_key,
    workspace_id,
    collection_id,
    extra_config,
    created_at,
    updated_at,
  })
  .describe(
    "Represents a single Postman configuration (workspace + collection) in the postman_configurations table. A project can have multiple configurations, typically one per Postman collection being used for the project's API development and testing.",
  );

export const rowSchema = { fields };
