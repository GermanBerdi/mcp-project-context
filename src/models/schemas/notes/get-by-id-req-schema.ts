import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const getByIdReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ id: true }).shape)
  .describe(
    "Retrieves a single note by its unique ID. Required field: 'id' (positive integer). Returns the complete note details including content and timestamps.",
  );
