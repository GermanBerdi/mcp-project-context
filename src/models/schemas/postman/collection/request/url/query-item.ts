import { z } from "zod";

const key = z.string().describe("Query parameter key.");

const value = z.string().optional().describe("Query parameter value.");

const disabled = z.boolean().optional().describe("Whether this query parameter is disabled.");

const description = z.string().optional().describe("Description or notes for this query parameter.");

const type = z.string().optional().describe("Type of the query parameter (e.g., 'text').");

export const queryItemSchema = z
  .object({
    key,
    value,
    disabled,
    description,
    type,
  })
  .describe("URL query parameter item.");
