import { z } from "zod";
import { requestSchema } from "./request/request.js";

const name = z.string().describe("Name of the request.");

//TODO: const event =

const id = z.uuid().describe("Unique identifier for the request.");

const protocolProfileBehavior = z
  .object({
    disableBodyPruning: z
      .boolean()
      .optional()
      .describe("Whether to disable body pruning for GET/DELETE requests. Allows sending body with these methods."),
  })
  .optional()
  .describe("Protocol-specific behavior settings.");

const request = requestSchema.describe(
  "The HTTP request details including method, URL, headers, body, and authentication.",
);
//TODO: const response =

const createdAt = z.string().describe("ISO 8601 timestamp when the request was created.");

const updatedAt = z.string().describe("ISO 8601 timestamp when the request was last updated.");

const uid = z.string().describe("Unique identifier in the format userId-requestId.");

export const itemRequestSchema = z
  .object({
    name,
    id,
    protocolProfileBehavior,
    request,
    createdAt,
    updatedAt,
    uid,
  })
  .describe("A Postman collection item that represents a single HTTP request with metadata and settings.");
