import { z } from "zod";

export const collectionSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  owner: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  uid: z.string(),
  isPublic: z.boolean(),
});

export const listCollectionsResSchema = z.object({
  collections: z.array(collectionSchema),
});
