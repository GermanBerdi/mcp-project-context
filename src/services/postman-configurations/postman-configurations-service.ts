import * as errors from "../../errors/errors.js";

import * as repos from "../../db/repos.js";

import * as models from "../../models/models.js";

const create = async (
  createReq: models.types.postmanConfigurations.CreateReq,
): Promise<models.types.postmanConfigurations.Row> => {
  try {
    const configuration = await repos.postmanConfiguration.create(createReq);
    return configuration;
  } catch (error) {
    const errorMessage = `Error in create at postman configurations service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

const getByProjectId = async (projectId: models.types.common.Id): Promise<models.types.postmanConfigurations.Row[]> => {
  try {
    const configurations = await repos.postmanConfiguration.getByProjectId(projectId);
    return configurations;
  } catch (error) {
    const errorMessage = `Error in getByProjectId at postman configurations service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

export const service = {
  create,
  getByProjectId,
};
