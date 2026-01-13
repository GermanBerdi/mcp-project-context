import { createCollection } from "./create-collection-service.js";
import { listCollections } from "./list-collections-service.js";
import { listWorkspaces } from "./list-workspaces-service.js";

export const service = {
  createCollection,
  listCollections,
  listWorkspaces,
};
