import { z } from "zod";
import type { RowDataPacket as DataPacket } from "mysql2";

import { rowSchema } from "../../schemas/projects/row-schema.js";
import { createReqSchema } from "../../schemas/projects/create-req-schema.js";
import { updateReqSchema } from "../../schemas/projects/update-req-schema.js";

export type Row = z.infer<typeof rowSchema.fields>;
export type RowDataPacket = Row & DataPacket;
export type CreateReq = z.infer<typeof createReqSchema>;
export type UpdateReq = z.infer<typeof updateReqSchema>;
