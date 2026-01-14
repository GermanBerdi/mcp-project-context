import { z } from "zod";
import { AuthType } from "../../../../enums/postman/postman-enums.js";

const type = z.literal(AuthType.Bearer).describe("Must be 'bearer' for Bearer token authentication.");

const bearer = z
  .array(
    z.object({
      key: z.literal("token").describe("Parameter key, always 'token' for Bearer authentication."),
      value: z.string().describe("Bearer token value."),
      type: z.literal("string").describe("Parameter type, always 'string' for Bearer tokens."),
    }),
  )
  .describe("Bearer token configuration parameters.");

export const bearerAuthSchema = z
  .object({
    type,
    bearer,
  })
  .describe("Configuration for Bearer token authentication.");
