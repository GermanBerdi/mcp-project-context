import { z } from "zod";
import { authSchema } from "../auths/auth.js";
import { formdataBodySchema } from "./bodies/formdata.js";
import { rawBodySchema } from "./bodies/raw.js";
import { urlSchema } from "./url/url.js";
import { HttpMethod } from "../../../../enums/common/http-enums.js";

const auth = authSchema.optional().describe("Authentication configuration for the request.");

const method = z.enum(HttpMethod).describe("HTTP method for the request.");

const headerSchema = z.object({
  key: z.string().describe("Header name (e.g., 'Content-Type', 'Authorization')."),
  value: z.string().describe("Header value."),
  disabled: z.boolean().optional().describe("Whether the header is disabled."),
  description: z.string().optional().describe("Header description or notes."),
});

const header = z.array(headerSchema).describe("List of HTTP headers for the request.");

const body = z.union([rawBodySchema, formdataBodySchema]).optional().describe("Body configuration for the request.");

const url = urlSchema;

export const requestSchema = z
  .object({
    method,
    url,
    auth,
    header,
    body,
  })
  .describe("Postman request configuration with method, URL, authentication, headers, and body.");
