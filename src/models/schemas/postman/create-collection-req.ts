import { z } from "zod";

const name = z
  .string()
  .min(1)
  .max(255)
  .describe("The name for the new Postman collection (e.g., 'MyProject API', 'Admin Endpoints').");

const description = z
  .string()
  .min(1)
  .max(1000)
  .optional()
  .describe("Optional description for the collection explaining its purpose and contents.");

const workspace_id = z
  .string()
  .uuid()
  .describe(
    "The UUID of the Postman workspace where the collection will be created. Use list_postman_workspaces to find available workspace IDs.",
  );

export const createCollectionReqSchema = z
  .object({
    name,
    description,
    workspace_id,
  })
  .describe(
    "Creates a new empty Postman collection (with no requests or folders) in the specified workspace. This is a preparatory tool that uses the POSTMAN_API_KEY from environment variables, typically used before creating a project's Postman configuration.",
  );
