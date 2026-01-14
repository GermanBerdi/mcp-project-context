import { z } from "zod";

const _postman_id = z.string().describe("Unique identifier for the Postman collection.");

const name = z.string().describe("Name of the collection.");

const schema = z.string().describe("URL to the Postman collection schema version (e.g., v2.1.0).");

const createdAt = z.string().describe("ISO 8601 timestamp when the collection was created.");

const updatedAt = z.string().describe("ISO 8601 timestamp when the collection was last updated.");

const lastUpdatedBy = z.string().describe("User ID of the person who last updated the collection.");

const uid = z.string().describe("Unique identifier in the format userId-collectionId.");

export const infoSchema = z
  .object({
    _postman_id,
    name,
    schema,
    createdAt,
    updatedAt,
    lastUpdatedBy,
    uid,
  })
  .describe("Collection metadata including identifiers, timestamps, and schema version.");
