import { z } from "zod";

import { project } from "../../enums/enums.js";

import * as commonSchema from "../common/common-schema.js";

const id = commonSchema.id.describe(
  "The unique numeric identifier of the project, used to reference a specific project record in the database. This ID is required to identify which project to update or retrieve.",
);

const project_name = z
  .string()
  .min(1)
  .max(255)
  .describe(
    "The name/title for the new project (e.g., 'E-commerce API', 'Mobile App', 'Data Pipeline'). Must be between 1-255 characters long.",
  );
const description = z
  .string()
  .min(1)
  .nullable()
  .describe("A detailed description of the project, its goals, and what it aims to accomplish.");
const statusDescribe = `The initial status of the project. Defaults to 'active' if not specified. Possible values are: ${Object.values(
  project.Status,
)
  .map((value) => `'${value}'`)
  .join(", ")}`;
const project_status = z.enum(project.Status).optional().describe(statusDescribe);

const created_at = z.instanceof(Date).describe("The timestamp when the project was created");

const updated_at = z.instanceof(Date).describe("The timestamp when the project was last updated");

const fields = z
  .object({
    id,
    project_name,
    description: description,
    project_status,
    created_at,
    updated_at,
  })
  .describe("Represents a single row in the projects database table with all key project attributes.");

export const rowSchema = {
  project_name,
  description,
  statusDescribe,
  project_status,
  fields,
};
