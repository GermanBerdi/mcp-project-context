import * as Error from "../../errors/errors.js";

import * as repo from "../../db/repos.js";

import * as model from "../../models/models.js";

const create = async (createReq: model.types.notes.CreateReq): Promise<model.types.notes.Row> => {
  try {
    const note = await repo.note.create(createReq);
    return note;
  } catch (error) {
    const errorMessage = `Error in create at notes service: ${String(error)}`;
    console.error(errorMessage);
    throw new Error.Service(errorMessage);
  }
};

export const service = {
  create,
};
