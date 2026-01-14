import { z } from "zod";

const key = z.string().describe("Key name for the form field.");

const value = z.string().optional().describe("Value for the form field.");

const type = z.literal("text").optional().describe("Type must be 'text' for text fields.");

const disabled = z.boolean().optional().describe("Whether this form field is disabled.");

const description = z.string().optional().describe("Description or notes for this form field.");

export const formdataTextSchema = z
  .object({
    key,
    value,
    type,
    disabled,
    description,
  })
  .describe("Formdata text (key-value pair).");
