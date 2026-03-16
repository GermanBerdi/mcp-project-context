import { z } from "zod";

import { paginationParamsSchema } from "../common/pagination-params-schema.js";

import { rowSchema } from "./row-schema.js";

export const listByProjectIdReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ project_id: true }).shape)
  .extend({ pagination: paginationParamsSchema })
  .describe(
    "Lists notes associated with a specific project with pagination support. Required field: 'project_id' (positive integer). Optional field: 'pagination' with 'page' (default 1) and 'pageSize' (default 20, max 100).",
  );
