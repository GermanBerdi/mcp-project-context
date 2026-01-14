import { z } from "zod";

const key = z.string().describe("Variable key name (e.g., 'id' for ':id' in path).");

const value = z.string().optional().describe("Variable value or placeholder.");

const id = z.string().optional().describe("Unique identifier for the variable.");

const description = z.string().optional().describe("Description or notes for this variable.");

export const variableItemSchema = z
  .object({
    key,
    value,
    id,
    description,
  })
  .describe("URL path variable item.");
