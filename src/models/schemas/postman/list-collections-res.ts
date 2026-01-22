import { z } from "zod";

const listCollectionItemSchema = z
  .object({
    id: z.uuid().describe("The UUID of the Postman collection."),
    name: z.string().describe("The name of the Postman collection."),
    owner: z.string().describe("The user ID or name of the collection owner."),
    createdAt: z.string().describe("ISO timestamp when the collection was created."),
    updatedAt: z.string().describe("ISO timestamp when the collection was last updated."),
    uid: z.string().describe("The unique Postman UID for the collection (may be used in API calls)."),
    isPublic: z.boolean().describe("Indicates if the collection is public (true) or private (false)."),
  })
  .describe("Represents a single Postman collection returned by the API.");

export const listCollectionsResSchema = z
  .object({
    collections: z
      .array(listCollectionItemSchema)
      .describe("Array of Postman collections for the specified workspace."),
  })
  .describe(
    "Response schema for listing Postman collections. Contains an array of collection objects with details such as id, name, owner, timestamps, UID, and visibility.",
  );
