import type { ResultSetHeader } from "mysql2";

import { pool } from "../connection.js";

import * as models from "../../models/models.js";

const create = async (
  createReq: models.types.postmanConfigurations.CreateReq,
): Promise<models.types.postmanConfigurations.Row> => {
  const keys = Object.keys(createReq);
  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const values = keys.map((key) => createReq[key as keyof typeof createReq]);
  const query = `
    INSERT INTO postman_configurations (${columns})
    VALUES (${placeholders});
  `;
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  if (result.affectedRows !== 1) throw new Error(`Insert failed: ${JSON.stringify(result)}`);
  const [rows] = await pool.execute<models.types.postmanConfigurations.RowDataPacket[]>(
    "SELECT * FROM postman_configurations WHERE id = ?",
    [result.insertId],
  );
  if (!rows.length) throw new Error(`Postman configuration created but not found with id ${result.insertId}`);
  return rows[0];
};

const getByProjectId = async (projectId: models.types.common.Id): Promise<models.types.postmanConfigurations.Row[]> => {
  const [rows] = await pool.execute<models.types.postmanConfigurations.RowDataPacket[]>(
    "SELECT * FROM postman_configurations WHERE project_id = ?",
    [projectId],
  );

  return rows;
};

export const repo = {
  create,
  getByProjectId,
};
