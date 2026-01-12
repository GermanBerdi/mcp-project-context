import { z } from "zod";

const queryResult = z
  .unknown()
  .describe(
    "Result of the executed SQL query. This can be an array of rows (e.g., for SELECT queries) or an object with metadata (e.g., for INSERT, UPDATE, DELETE).",
  );

const fieldPacket = z
  .unknown()
  .describe("Array of metadata about the columns returned in the result set. Only available for SELECT queries.");

export const executeResSchema = z.object({
  queryResult,
  fieldPacket,
});
