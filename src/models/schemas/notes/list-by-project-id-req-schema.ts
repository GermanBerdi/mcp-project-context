import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

export const listByProjectIdReqSchema = z
  .object({
    project_id: commonSchema.id.describe(
      "The unique numeric identifier of the project to list notes from. Must be a positive integer that exists in the database.",
    ),
  })
  .describe(
    "Lists all notes associated with a specific project. Required field: 'project_id' (positive integer). Returns an array of all notes for that project.",
  );
