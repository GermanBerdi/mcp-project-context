import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

export const getByIdReqSchema = z
  .object({
    id: commonSchema.id.describe(
      "The unique numeric identifier of the project to retrieve. Must be a positive integer that exists in the database.",
    ),
  })
  .describe(
    "Retrieves a single project by its unique ID. Required field: 'id' (positive integer). Returns the complete project details including name, description, status, and timestamps.",
  );
