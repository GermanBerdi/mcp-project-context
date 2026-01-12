import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

const id = commonSchema.id.describe(
  "The unique numeric identifier of the note, used to reference a specific note record in the database. This ID is required to identify which note to update or retrieve.",
);

const project_id = commonSchema.id.describe(
  "The unique numeric identifier of the project this note belongs to. Must be a valid project ID that exists in the projects table.",
);

const content = z
  .string()
  .min(1)
  .describe("The content of the note. Can contain any text including markdown, code snippets, or plain text.");

const created_at = z.instanceof(Date).describe("The timestamp when the note was created");

const updated_at = z.instanceof(Date).describe("The timestamp when the note was last updated");

const fields = z
  .object({
    id,
    project_id,
    content,
    created_at,
    updated_at,
  })
  .describe("Represents a single row in the notes database table with all key note attributes.");

export const rowSchema = {
  project_id,
  content,
  fields,
};
