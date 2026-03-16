import type { ResultSetHeader } from "mysql2";

import { pool } from "../connection.js";

import * as models from "../../models/models.js";

import * as utils from "../../utils/utils.js";

const create = async (createReq: models.types.notes.CreateReq): Promise<models.types.notes.Row> => {
  const keys = Object.keys(createReq);
  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const values = keys.map((key) => createReq[key as keyof typeof createReq]);
  const query = `
    INSERT INTO notes (${columns})
    VALUES (${placeholders});
  `;
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(`Insert failed: ${JSON.stringify(result)}`);
  const [rows] = await pool.execute<models.types.notes.RowDataPacket[]>("SELECT * FROM notes WHERE id = ?", [
    result.insertId,
  ]);
  if (!rows.length) throw new Error(`Note created but not found with id ${result.insertId}`);
  return rows[0];
};

const getById = async (id: models.types.common.Id): Promise<models.types.notes.Row | null> => {
  const [rows] = await pool.execute<models.types.notes.RowDataPacket[]>("SELECT * FROM notes WHERE id = ?;", [id]);
  return rows.length > 0 ? rows[0] : null;
};

const getByProjectId = async (
  projectId: models.types.common.Id,
  pagination: models.types.common.Pagination,
): Promise<models.types.common.TotalAndData<models.types.notes.Row>> => {
  const limit = utils.sql.pagination.buildSQLLimit(pagination);
  const [totalResult] = await pool.execute<models.types.common.TotalRowDataPacket[]>(
    "SELECT COUNT(id) as total FROM notes WHERE project_id = ?;",
    [projectId],
  );
  const [rows] = await pool.execute<models.types.notes.RowDataPacket[]>(
    `SELECT * FROM notes WHERE project_id = ? ORDER BY id ${limit};`,
    [projectId],
  );
  return { total: totalResult[0].total, data: rows };
};

const update = async (updateReq: models.types.notes.UpdateReq): Promise<models.types.notes.Row> => {
  const { id, ...fields } = updateReq;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const query = `
    UPDATE notes SET ${setClause}
    WHERE id = ?;
  `;
  const values: (number | string | null | undefined)[] = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(`Update failed: ${JSON.stringify(result)}`);
  const [rows] = await pool.execute<models.types.notes.RowDataPacket[]>("SELECT * FROM notes WHERE id = ?;", [id]);
  if (!rows.length) throw new Error(`Note updated but not found with id ${id}`);
  return rows[0];
};

const remove = async (id: models.types.common.Id): Promise<void> => {
  const [result] = await pool.execute<ResultSetHeader>("DELETE FROM notes WHERE id = ?;", [id]);
  if (result.affectedRows !== 1) throw new Error(`Delete failed: ${JSON.stringify(result)}`);
};

export const repo = {
  create,
  getById,
  getByProjectId,
  update,
  remove,
};
