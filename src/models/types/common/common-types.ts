import { z } from "zod";
import type { RowDataPacket as DataPacket } from "mysql2";

import { id } from "../../schemas/common/id-schema.js";
import { paginationParamsSchema } from "../../schemas/common/pagination-params-schema.js";

export type Id = z.infer<typeof id>;
export type Pagination = z.infer<typeof paginationParamsSchema>;

type TotalResult = { total: number };
export type TotalRowDataPacket = TotalResult & DataPacket;
export type TotalAndData<T> = { total: number; data: T[] };
