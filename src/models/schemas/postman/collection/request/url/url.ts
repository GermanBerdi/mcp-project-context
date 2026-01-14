import { z } from "zod";
import { UrlProtocol } from "../../../../../enums/postman/postman-enums.js";
import { queryItemSchema } from "./query-item.js";
import { variableItemSchema } from "./variable-item.js";

const raw = z.string().describe("Complete raw URL string including protocol, host, path, query, and variables.");

const protocol = z.enum(UrlProtocol).optional().describe("Protocol (http, https, ws, wss, ftp).");

const host = z
  .array(z.string())
  .optional()
  .describe("Array of host segments (can include Postman variables like '{{api_url}}').");

const port = z.string().optional().describe("Port number as string (e.g., '5000', '8080').");

const path = z.array(z.string()).optional().describe("Array of path segments (e.g., ['api', 'users', ':id']).");

const query = z.array(queryItemSchema).optional().describe("Array of query parameters.");

const variable = z.array(variableItemSchema).optional().describe("Array of path variables (e.g., ':id' parameters).");

export const urlSchema = z
  .object({
    raw,
    protocol,
    host,
    port,
    path,
    query,
    variable,
  })
  .describe("Request URL object with protocol, host, path, query, and variables.");
