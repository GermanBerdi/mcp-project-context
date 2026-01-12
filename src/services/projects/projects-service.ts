import * as Error from "../../errors/errors.js";

import * as repo from "../../db/repos.js";

import * as model from "../../models/models.js";

const create = async (createReq: model.types.projects.CreateReq): Promise<model.types.projects.Row> => {
  try {
    const projectData = {
      ...createReq,
      project_status: createReq.project_status ?? model.enums.project.Status.ACTIVE,
    };
    const project = await repo.project.create(projectData);
    return project;
  } catch (error) {
    const errorMessage = `Error in create at projects service: ${String(error)}`;
    console.error(errorMessage);
    throw new Error.Service(errorMessage);
  }
};

const getAll = async (): Promise<model.types.projects.Row[]> => {
  try {
    const projects = await repo.project.getAll();
    return projects;
  } catch (error) {
    const errorMessage = `Error in getAll at projects service: ${String(error)}`;
    console.error(errorMessage);
    throw new Error.Service(errorMessage);
  }
};

const getById = async (id: model.types.common.Id): Promise<model.types.projects.Row> => {
  try {
    const project = await repo.project.getById(id);
    if (!project) throw new Error.NotFound(`Project with id ${id} not found.`);
    return project;
  } catch (error) {
    const errorMessage = `Error in getById at projects service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof Error.BaseError) throw error;
    throw new Error.Service(errorMessage);
  }
};

const remove = async (id: model.types.common.Id): Promise<void> => {
  try {
    await getById(id);
    await repo.project.remove(id);
  } catch (error) {
    const errorMessage = `Error in remove at projects service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof Error.BaseError) throw error;
    throw new Error.Service(errorMessage);
  }
};

export const service = {
  create,
  getAll,
  getById,
  remove,
};
