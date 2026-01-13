import { z } from "zod";

import { listCollectionsReqSchema } from "../../schemas/postman/list-collections-req.js";
import { collectionSchema, listCollectionsResSchema } from "../../schemas/postman/list-collections-res.js";
import { workspaceSchema, listWorkspacesResSchema } from "../../schemas/postman/list-workspaces-res.js";

export type ListCollectionsReq = z.infer<typeof listCollectionsReqSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type ListCollectionsRes = z.infer<typeof listCollectionsResSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export type ListWorkspacesRes = z.infer<typeof listWorkspacesResSchema>;
