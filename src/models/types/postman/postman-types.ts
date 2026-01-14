import { z } from "zod";

import { collectionSchema } from "../../schemas/postman/collection/collection.js";
import { createCollectionReqSchema } from "../../schemas/postman/create-collection-req.js";
import { createdCollectionSchema, createCollectionResSchema } from "../../schemas/postman/create-collection-res.js";
import { listCollectionsReqSchema } from "../../schemas/postman/list-collections-req.js";
import { listCollectionItemSchema, listCollectionsResSchema } from "../../schemas/postman/list-collections-res.js";
import { listWorkspaceItemSchema, listWorkspacesResSchema } from "../../schemas/postman/list-workspaces-res.js";

export type Collection = z.infer<typeof collectionSchema>;
export type CreateCollectionReq = z.infer<typeof createCollectionReqSchema>;
export type CreatedCollection = z.infer<typeof createdCollectionSchema>;
export type CreateCollectionRes = z.infer<typeof createCollectionResSchema>;
export type ListCollectionsReq = z.infer<typeof listCollectionsReqSchema>;
export type ListCollectionItem = z.infer<typeof listCollectionItemSchema>;
export type ListCollectionsRes = z.infer<typeof listCollectionsResSchema>;
export type ListWorkspaceItem = z.infer<typeof listWorkspaceItemSchema>;
export type ListWorkspacesRes = z.infer<typeof listWorkspacesResSchema>;
