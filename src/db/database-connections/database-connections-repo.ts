import type { ResultSetHeader } from "mysql2";

import { pool } from "../connection.js";

import * as models from "../../models/models.js";

const create = async (
  createReq: models.types.databaseConnections.CreateReq,
): Promise<models.types.databaseConnections.Row> => {
  const keys = Object.keys(createReq);
  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const values = keys.map((key) => createReq[key as keyof typeof createReq]);
  const query = `
    INSERT INTO database_connections (${columns})
    VALUES (${placeholders});
  `;
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(`Insert failed: ${JSON.stringify(result)}`);
  const [rows] = await pool.execute<models.types.databaseConnections.RowDataPacket[]>(
    "SELECT * FROM database_connections WHERE id = ?",
    [result.insertId],
  );
  if (!rows.length) throw new Error(`Database connection created but not found with id ${result.insertId}`);
  return rows[0];
};

const getById = async (id: models.types.common.Id): Promise<models.types.databaseConnections.Row | null> => {
  const [rows] = await pool.execute<models.types.databaseConnections.RowDataPacket[]>(
    "SELECT * FROM database_connections WHERE id = ?;",
    [id],
  );
  return rows.length > 0 ? rows[0] : null;
};

const getByProjectId = async (projectId: models.types.common.Id): Promise<models.types.databaseConnections.Row[]> => {
  const [rows] = await pool.execute<models.types.databaseConnections.RowDataPacket[]>(
    "SELECT * FROM database_connections WHERE project_id = ?;",
    [projectId],
  );
  return rows;
};

export const repo = {
  create,
  getById,
  getByProjectId,
};
