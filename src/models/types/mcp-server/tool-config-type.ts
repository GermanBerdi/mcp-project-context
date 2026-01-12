import type { ZodRawShapeCompat, AnySchema } from "@modelcontextprotocol/sdk/server/zod-compat.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

import { HttpStatus } from "../../enums/enums.js";

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

export type contentData<T> = {
  success: true;
  httpCode: HttpStatus;
  message: string;
  data?: T
}
  
export type errorData = {
  success: false;
  httpCode: HttpStatus;
  message: string;
  error: string;
}