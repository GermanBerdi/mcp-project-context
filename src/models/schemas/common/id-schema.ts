import { z } from "zod";

export const id = z.number().int().positive();
