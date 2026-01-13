import { z } from "zod";

import { createCollectionReqSchema } from "../../schemas/postman/create-collection-req.js";
import { createdCollectionSchema, createCollectionResSchema } from "../../schemas/postman/create-collection-res.js";
import { listCollectionsReqSchema } from "../../schemas/postman/list-collections-req.js";
import { collectionSchema, listCollectionsResSchema } from "../../schemas/postman/list-collections-res.js";
import { workspaceSchema, listWorkspacesResSchema } from "../../schemas/postman/list-workspaces-res.js";

export type CreateCollectionReq = z.infer<typeof createCollectionReqSchema>;
export type CreatedCollection = z.infer<typeof createdCollectionSchema>;
export type CreateCollectionRes = z.infer<typeof createCollectionResSchema>;
export type ListCollectionsReq = z.infer<typeof listCollectionsReqSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type ListCollectionsRes = z.infer<typeof listCollectionsResSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export type ListWorkspacesRes = z.infer<typeof listWorkspacesResSchema>;
