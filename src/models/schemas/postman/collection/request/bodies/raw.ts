import { z } from "zod";
import { BodyMode, RawBodyLanguage } from "../../../../../enums/postman/postman-enums.js";

const mode = z.literal(BodyMode.Raw).describe("Body mode must be 'raw'.");

const raw = z.string().optional().describe("Raw content of the request body.");

const options = z
  .object({
    raw: z.object({
      language: z.enum(RawBodyLanguage).describe("Language/format of the raw content."),
    }),
  })
  .describe("Additional options for raw body.");

export const rawBodySchema = z
  .object({
    mode,
    raw,
    options,
  })
  .describe("Configuration for raw body mode in Postman requests.");
