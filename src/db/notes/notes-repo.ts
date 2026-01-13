import type { ResultSetHeader } from "mysql2";

import { pool } from "../connection.js";

import * as models from "../../models/models.js";

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

const getByProjectId = async (projectId: models.types.common.Id): Promise<models.types.notes.Row[]> => {
  const [rows] = await pool.execute<models.types.notes.RowDataPacket[]>("SELECT * FROM notes WHERE project_id = ?;", [
    projectId,
  ]);
  return rows;
};

export const repo = {
  create,
  getByProjectId,
};
