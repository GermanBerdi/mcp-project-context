import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const updateReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ id: true }).shape)
  .extend({
    content: rowSchema.fields.shape.content.optional(),
  })
  .describe(
    "Updates an existing note in the database. Required: 'id' (number). Optional: 'content' (string). At least one optional field must be provided.",
  );
