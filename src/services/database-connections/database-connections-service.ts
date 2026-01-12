import * as Error from "../../errors/errors.js";

import * as repo from "../../db/repos.js";

import * as model from "../../models/models.js";

const create = async (
  createReq: model.types.databaseConnections.CreateReq,
): Promise<model.types.databaseConnections.Row> => {
  try {
    const databaseConnection = await repo.databaseConnection.create(createReq);
    return databaseConnection;
  } catch (error) {
    const errorMessage = `Error in create at database-connections service: ${String(error)}`;
    console.error(errorMessage);
    throw new Error.Service(errorMessage);
  }
};

const getByProjectId = async (project_id: model.types.common.Id): Promise<model.types.databaseConnections.Row[]> => {
  try {
    const databaseConnections = await repo.databaseConnection.getByProjectId(project_id);
    return databaseConnections;
  } catch (error) {
    const errorMessage = `Error in getByProjectId at database-connections service: ${String(error)}`;
    console.error(errorMessage);
    throw new Error.Service(errorMessage);
  }
};

export const service = {
  create,
  getByProjectId,
};
