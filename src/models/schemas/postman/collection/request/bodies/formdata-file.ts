import { z } from "zod";

const key = z.string().describe("Key name for the file field.");

const src = z.string().nullable().optional().describe("Source path or identifier for the file.");

const type = z.literal("file").optional().describe("Type must be 'file' for file uploads.");

const disabled = z.boolean().optional().describe("Whether this file field is disabled.");

const description = z.string().optional().describe("Description or notes for this file field.");

export const formdataFileSchema = z
  .object({
    key,
    src,
    type,
    disabled,
    description,
  })
  .describe("Formdata file (file upload).");
