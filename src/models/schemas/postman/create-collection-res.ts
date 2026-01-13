import { z } from "zod";

export const createdCollectionSchema = z
  .object({
    id: z.uuid().describe("The unique identifier of the created collection."),
    name: z.string().describe("The name of the created collection."),
    uid: z.string().describe("The unique identifier combining owner and collection ID."),
  })
  .describe("Information about the newly created Postman collection.");

export const createCollectionResSchema = z
  .object({
    collection: createdCollectionSchema,
  })
  .describe("Response from Postman API after creating a new collection.");
