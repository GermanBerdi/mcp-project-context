import type { ZodRawShapeCompat, AnySchema } from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

import * as enums from "../../enums/enums.js";

export type ToolConfig<
  InputArgs extends undefined | ZodRawShapeCompat | AnySchema = undefined,
  OutputArgs extends undefined | ZodRawShapeCompat | AnySchema = undefined
> = {
  title?: string;
  description?: string;
  inputSchema?: InputArgs;
  outputSchema?: OutputArgs;
  annotations?: ToolAnnotations;
  _meta?: Record<string, unknown>;
}

export type contentData = {
  success: true;
  httpCode: enums.HttpStatus;
  message: string;
}
  
export type errorData = {
  success: false;
  httpCode: enums.HttpStatus;
  message: string;
  error: string;
}