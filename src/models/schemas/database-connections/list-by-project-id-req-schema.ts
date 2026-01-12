import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

export const listByProjectIdReqSchema = z
  .object({
    project_id: commonSchema.id.describe(
      "The unique numeric identifier of the project to list database connections from. Must be a positive integer that exists in the database.",
    ),
  })
  .describe(
    "Lists all database connections associated with a specific project. Required field: 'project_id' (positive integer). Returns an array of all database connections for that project.",
  );
