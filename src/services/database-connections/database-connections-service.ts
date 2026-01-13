import * as errors from "../../errors/errors.js";

import * as repos from "../../db/repos.js";

import * as models from "../../models/models.js";

const create = async (
  createReq: models.types.databaseConnections.CreateReq,
): Promise<models.types.databaseConnections.Row> => {
  try {
    const databaseConnection = await repos.databaseConnection.create(createReq);
    return databaseConnection;
  } catch (error) {
    const errorMessage = `Error in create at database-connections service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

const getById = async (id: models.types.common.Id): Promise<models.types.databaseConnections.Row> => {
  try {
    const databaseConnection = await repos.databaseConnection.getById(id);
    if (!databaseConnection) {
      throw new errors.NotFound(`Database connection with id ${id} not found`);
    }
    return databaseConnection;
  } catch (error) {
    const errorMessage = `Error in getById at database-connections service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof errors.BaseError) throw error;
    throw new errors.Service(errorMessage);
  }
};

const getByProjectId = async (projectId: models.types.common.Id): Promise<models.types.databaseConnections.Row[]> => {
  try {
    const databaseConnections = await repos.databaseConnection.getByProjectId(projectId);
    return databaseConnections;
  } catch (error) {
    const errorMessage = `Error in getByProjectId at database-connections service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

export const service = {
  create,
  getById,
  getByProjectId,
};
