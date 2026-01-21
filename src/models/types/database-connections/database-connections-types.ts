import { z } from "zod";
import type { RowDataPacket as DataPacket } from "mysql2";

import { rowSchema } from "../../schemas/database-connections/row-schema.js";
import { createReqSchema } from "../../schemas/database-connections/create-req-schema.js";
import { getByIdReqSchema } from "../../schemas/database-connections/get-by-id-req-schema.js";
import { removeReqSchema } from "../../schemas/database-connections/remove-req-schema.js";
import { updateReqSchema } from "../../schemas/database-connections/update-req-schema.js";

export type Row = z.infer<typeof rowSchema.fields>;
export type RowDataPacket = Row & DataPacket;
export type CreateReq = z.infer<typeof createReqSchema>;
export type GetByIdReq = z.infer<typeof getByIdReqSchema>;
export type UpdateReq = z.infer<typeof updateReqSchema>;
export type RemoveReq = z.infer<typeof removeReqSchema>;
