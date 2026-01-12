import { z } from "zod";
import type { RowDataPacket as DataPacket } from "mysql2";

import { createReqSchema } from "../../schemas/database-connections/create-req-schema.js";
import { rowSchema } from "../../schemas/database-connections/row-schema.js";

export type CreateReq = z.infer<typeof createReqSchema>;
export type Row = z.infer<typeof rowSchema.fields>;
export type RowDataPacket = Row & DataPacket;
