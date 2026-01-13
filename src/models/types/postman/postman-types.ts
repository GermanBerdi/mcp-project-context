import { z } from "zod";

import * as schemas from "../../schemas/schemas.js";

export type Workspace = z.infer<typeof schemas.postman.WorkspaceSchema>;
export type ListWorkspacesRes = z.infer<typeof schemas.postman.ListWorkspacesResSchema>;
