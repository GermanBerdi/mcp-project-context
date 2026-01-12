import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

const connection_id = commonSchema.id.describe(
  "The unique numeric identifier of the database connection to use for executing the SQL query. Must be a valid connection ID that exists in the database_connections table.",
);

const query = z
  .string()
  .min(1)
  .describe(
    "The SQL statement to execute. Can be a SELECT, INSERT, UPDATE, DELETE, or any valid SQL statement supported by the target database. Use parameterized queries with placeholders (?) for safe value injection.",
  );

const params = z
  .array(z.any())
  .optional()
  .describe(
    "Optional array of values to safely inject into the SQL statement using placeholders (e.g., ? in prepared statements). Use this to prevent SQL injection attacks. Values are bound in order to the placeholders in the query.",
  );

export const executeReqSchema = z
  .object({
    connection_id,
    query,
    params,
  })
  .describe(
    "Executes a SQL query using a specific database connection. Required fields: connection_id (integer), query (string). Optional: params (array of values for parameterized queries).",
  );
