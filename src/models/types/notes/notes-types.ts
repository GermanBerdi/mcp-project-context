import { z } from "zod";
import type { RowDataPacket as DataPacket } from "mysql2";

import { rowSchema } from "../../schemas/notes/row-schema.js";
import { createReqSchema } from "../../schemas/notes/create-req-schema.js";
import { updateReqSchema } from "../../schemas/notes/update-req-schema.js";

export type Row = z.infer<typeof rowSchema.fields>;
export type RowDataPacket = Row & DataPacket;
export type CreateReq = z.infer<typeof createReqSchema>;
export type UpdateReq = z.infer<typeof updateReqSchema>;
