import { z } from "zod";
import { infoSchema } from "./info.js";
import { itemFolderSchema } from "./item-folder.js";
import { itemRequestSchema } from "./item-request.js";
import { authSchema } from "./auths/auth.js";

// TODO: 1. Renombrar todos los archivos de "postman" con el sufijo "-schema.ts" para seguir el patrón del resto de schemas
// TODO: 2. Definir eventSchema y aplicarlo a nivel collection, folder y request
// TODO: 3. Ver qué más falta (variables, response, etc.)

const info = infoSchema;

const item = z
  .array(z.union([itemRequestSchema, itemFolderSchema]))
  .describe("Array of items (requests or folders) in the collection.");

const auth = authSchema.describe(
  "Authentication configuration for the collection. Can be inherited by requests and folders unless overridden.",
);

export const collectionSchema = z
  .object({
    info,
    item,
    auth,
  })
  .describe("Postman collection schema with metadata, items, authentication, and variables.");
