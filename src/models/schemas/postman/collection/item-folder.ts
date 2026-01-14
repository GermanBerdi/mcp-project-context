import { z } from "zod";
import { itemRequestSchema } from "./item-request.js";
import { authSchema } from "./auths/auth.js";

const name = z.string().describe("Name of the folder.");

const id = z.uuid().describe("Unique identifier for the folder.");

const auth = authSchema
  .optional()
  .describe("Authentication configuration for this folder. Overrides collection auth if present.");

const createdAt = z.string().describe("ISO 8601 timestamp when the folder was created.");

const updatedAt = z.string().describe("ISO 8601 timestamp when the folder was last updated.");

const uid = z.string().describe("Unique identifier in the format userId-folderId.");

export const itemFolderSchema: z.ZodType<any> = z.lazy(() =>
  z
    .object({
      name,
      item: z
        .array(z.union([itemRequestSchema, itemFolderSchema]))
        .describe("Array of items (requests or nested folders) inside this folder."),
      id,
      auth,
      createdAt,
      updatedAt,
      uid,
    })
    .describe("A Postman folder that can contain requests or other folders."),
);
