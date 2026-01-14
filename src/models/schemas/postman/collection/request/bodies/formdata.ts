import { z } from "zod";
import { BodyMode } from "../../../../../enums/postman/postman-enums.js";
import { formdataTextSchema } from "./formdata-text.js";
import { formdataFileSchema } from "./formdata-file.js";

const mode = z.literal(BodyMode.Formdata).describe("Body mode must be 'formdata'.");

const formdata = z
  .array(z.union([formdataTextSchema, formdataFileSchema]))
  .optional()
  .describe("Array of form fields (text or file).");

export const formdataBodySchema = z
  .object({
    mode,
    formdata,
  })
  .describe("Configuration for formdata body mode in Postman requests.");
