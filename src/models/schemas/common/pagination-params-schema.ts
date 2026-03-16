import { z } from "zod";

const page = z.number().int().min(1).default(1).describe("Page number to retrieve. Starts at 1.");

const page_size = z
  .number()
  .int()
  .min(1)
  .max(100)
  .default(20)
  .describe("Number of items per page. Maximum is 100. Default is 20.");

export const paginationParamsSchema = z
  .object({
    page,
    page_size,
  })
  .optional()
  .default({ page: 1, page_size: 20 })
  .describe("Pagination parameters for paginated queries.");
