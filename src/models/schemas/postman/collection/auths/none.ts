import { z } from "zod";
import { AuthType } from "../../../../enums/postman/postman-enums.js";

const type = z.literal(AuthType.NoAuth).describe("Must be 'noauth' for no authentication.");

export const noneAuthSchema = z
  .object({
    type,
  })
  .describe("Configuration indicating that no authentication is required for this request.");
