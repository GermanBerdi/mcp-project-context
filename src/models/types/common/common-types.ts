import { z } from "zod";

import { id } from "../../schemas/common/id-schema.js";

export type Id = z.infer<typeof id>;
