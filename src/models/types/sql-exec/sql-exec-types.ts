import { z } from "zod";

import { executeReqSchema } from "../../schemas/sql-exec/execute-req-schema.js";
import { executeResSchema } from "../../schemas/sql-exec/execute-res-schema.js";

export type ExecuteReq = z.infer<typeof executeReqSchema>;
export type ExecuteRes = z.infer<typeof executeResSchema>;
