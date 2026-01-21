import * as errors from "../../errors/errors.js";

import * as repos from "../../db/repos.js";

import * as models from "../../models/models.js";

const create = async (createReq: models.types.notes.CreateReq): Promise<models.types.notes.Row> => {
  try {
    const note = await repos.note.create(createReq);
    return note;
  } catch (error) {
    const errorMessage = `Error in create at notes service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

const getById = async (id: models.types.common.Id): Promise<models.types.notes.Row> => {
  try {
    const note = await repos.note.getById(id);
    if (!note) throw new errors.NotFound(`Note with id ${id} not found.`);
    return note;
  } catch (error) {
    const errorMessage = `Error in getById at notes service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof errors.BaseError) throw error;
    throw new errors.Service(errorMessage);
  }
};

const getByProjectId = async (projectId: models.types.common.Id): Promise<models.types.notes.Row[]> => {
  try {
    const notes = await repos.note.getByProjectId(projectId);
    return notes;
  } catch (error) {
    const errorMessage = `Error in getByProjectId at notes service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

const remove = async (id: models.types.common.Id): Promise<void> => {
  try {
    await getById(id);
    await repos.note.remove(id);
  } catch (error) {
    const errorMessage = `Error in remove at notes service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof errors.BaseError) throw error;
    throw new errors.Service(errorMessage);
  }
};

export const service = {
  create,
  getById,
  getByProjectId,
  remove,
};
