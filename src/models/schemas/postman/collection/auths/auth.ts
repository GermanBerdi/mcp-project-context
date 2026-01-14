import { z } from "zod";
import { bearerAuthSchema } from "./bearer.js";
import { noneAuthSchema } from "./none.js";

/**
 * Union of all available authentication schemas.
 * Add new auth types here when implemented.
 */
export const authSchema = z.union([bearerAuthSchema, noneAuthSchema]);
