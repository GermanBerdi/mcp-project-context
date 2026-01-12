import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

export const removeReqSchema = z
  .object({
    id: commonSchema.id.describe(
      "The unique numeric identifier of the project to delete. Must be a positive integer that exists in the database.",
    ),
  })
  .describe(
    "Deletes a project from the database by its unique ID. Required field: 'id' (positive integer). This operation is permanent and cannot be undone.",
  );
