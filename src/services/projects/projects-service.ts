import * as errors from "../../errors/errors.js";

import * as repos from "../../db/repos.js";

import * as models from "../../models/models.js";

const create = async (createReq: models.types.projects.CreateReq): Promise<models.types.projects.Row> => {
  try {
    const projectData = {
      ...createReq,
      project_status: createReq.project_status ?? models.enums.project.Status.ACTIVE,
    };
    const project = await repos.project.create(projectData);
    return project;
  } catch (error) {
    const errorMessage = `Error in create at projects service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

const getAll = async (): Promise<models.types.projects.Row[]> => {
  try {
    const projects = await repos.project.getAll();
    return projects;
  } catch (error) {
    const errorMessage = `Error in getAll at projects service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

const getById = async (id: models.types.common.Id): Promise<models.types.projects.Row> => {
  try {
    const project = await repos.project.getById(id);
    if (!project) throw new errors.NotFound(`Project with id ${id} not found.`);
    return project;
  } catch (error) {
    const errorMessage = `Error in getById at projects service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof errors.BaseError) throw error;
    throw new errors.Service(errorMessage);
  }
};

const update = async (updateReq: models.types.projects.UpdateReq): Promise<models.types.projects.Row> => {
  try {
    await getById(updateReq.id);
    const project = await repos.project.update(updateReq);
    return project;
  } catch (error) {
    const errorMessage = `Error in update at projects service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof errors.BaseError) throw error;
    throw new errors.Service(errorMessage);
  }
};

const remove = async (id: models.types.common.Id): Promise<void> => {
  try {
    await getById(id);
    await repos.project.remove(id);
  } catch (error) {
    const errorMessage = `Error in remove at projects service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof errors.BaseError) throw error;
    throw new errors.Service(errorMessage);
  }
};

export const service = {
  create,
  getAll,
  getById,
  update,
  remove,
};
