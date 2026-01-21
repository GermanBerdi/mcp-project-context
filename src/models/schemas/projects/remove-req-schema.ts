import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const removeReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ id: true }).shape)
  .describe(
    "Deletes a project from the database by its unique ID. Required field: 'id' (positive integer). This operation is permanent and cannot be undone.",
  );
