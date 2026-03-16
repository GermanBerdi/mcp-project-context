import * as errors from "../../errors/errors.js";

import * as repos from "../../db/repos.js";

import * as models from "../../models/models.js";

import * as utils from "../../utils/utils.js";

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

const getByProjectId = async (
  projectId: models.types.common.Id,
  pagination: models.types.common.Pagination,
): Promise<models.types.util.PaginatedData<models.types.notes.Row>> => {
  try {
    const { total, data } = await repos.note.getByProjectId(projectId, pagination);
    return utils.sql.pagination.buildPaginatedResponse(data, total, pagination);
  } catch (error) {
    const errorMessage = `Error in getByProjectId at notes service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

const update = async (updateReq: models.types.notes.UpdateReq): Promise<models.types.notes.Row> => {
  try {
    await getById(updateReq.id);
    const note = await repos.note.update(updateReq);
    return note;
  } catch (error) {
    const errorMessage = `Error in update at notes service: ${String(error)}`;
    console.error(errorMessage);
    if (error instanceof errors.BaseError) throw error;
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
  update,
  remove,
};
