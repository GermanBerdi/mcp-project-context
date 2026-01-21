import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const getByIdReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ id: true }).shape)
  .describe(
    "Retrieves a single database connection by its unique ID. Required field: 'id' (positive integer). Returns the complete database connection details including host, port, database name, credentials, and timestamps.",
  );
