import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const createReqSchema = z
  .object({})
  .extend(rowSchema.fields.omit({ id: true, created_at: true, updated_at: true }).shape)
  .describe(
    "Creates a new note in the database. Required fields: 'project_id' (positive integer, must exist in projects table), 'content' (string, min 1 char, the note text).",
  );
