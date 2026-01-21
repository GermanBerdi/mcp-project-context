import type { ResultSetHeader } from "mysql2";

import { pool } from "../connection.js";

import * as models from "../../models/models.js";

const create = async (createReq: models.types.projects.CreateReq): Promise<models.types.projects.Row> => {
  const keys = Object.keys(createReq);
  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const values = keys.map((key) => createReq[key as keyof typeof createReq]);
  const query = `
    INSERT INTO projects (${columns})
    VALUES (${placeholders});
  `;
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(`Insert failed: ${JSON.stringify(result)}`);
  const [rows] = await pool.execute<models.types.projects.RowDataPacket[]>("SELECT * FROM projects WHERE id = ?", [
    result.insertId,
  ]);
  if (!rows.length) throw new Error(`Project created but not found with id ${result.insertId}`);
  return rows[0];
};

const getAll = async (): Promise<models.types.projects.Row[]> => {
  const [rows] = await pool.execute<models.types.projects.RowDataPacket[]>("SELECT * FROM projects;");
  return rows;
};

const getById = async (id: models.types.common.Id): Promise<models.types.projects.Row | null> => {
  const [rows] = await pool.execute<models.types.projects.RowDataPacket[]>("SELECT * FROM projects WHERE id = ?;", [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

const update = async (updateReq: models.types.projects.UpdateReq): Promise<models.types.projects.Row> => {
  const { id, ...fields } = updateReq;
  const keys = Object.keys(fields).filter((key) => fields[key as keyof typeof fields] !== undefined);
  if (keys.length === 0) throw new Error("No fields to update");
  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const query = `
    UPDATE projects SET ${setClause}
    WHERE id = ?;
  `;
  const values: (number | string | null | undefined)[] = keys.map((key) => fields[key as keyof typeof fields]);
  values.push(id);
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(`Update failed: ${JSON.stringify(result)}`);
  const [rows] = await pool.execute<models.types.projects.RowDataPacket[]>("SELECT * FROM projects WHERE id = ?;", [
    id,
  ]);
  if (!rows.length) throw new Error(`Project updated but not found with id ${id}`);
  return rows[0];
};

const remove = async (id: models.types.common.Id): Promise<void> => {
  const [result] = await pool.execute<ResultSetHeader>("DELETE FROM projects WHERE id = ?;", [id]);
  if (result.affectedRows !== 1) throw new Error(`Delete failed: ${JSON.stringify(result)}`);
};

export const repo = {
  create,
  getAll,
  getById,
  update,
  remove,
};
