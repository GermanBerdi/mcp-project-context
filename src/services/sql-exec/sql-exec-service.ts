import mysql from "mysql2/promise";

import * as errors from "../../errors/errors.js";

import { service as databaseConnectionsService } from "../database-connections/database-connections-service.js";

import * as models from "../../models/models.js";

const execute = async (executeReq: models.types.sqlExec.ExecuteReq): Promise<models.types.sqlExec.ExecuteRes> => {
  const { connection_id, query, params } = executeReq;
  try {
    const connection = await databaseConnectionsService.getById(connection_id);

    const pool = mysql.createPool({
      host: connection.host,
      port: connection.port,
      database: connection.database_name,
      user: connection.username,
      password: connection.password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    try {
      const safeParams = params ?? [];
      const [queryResult, fieldPacket] = await pool.execute(query, safeParams);
      return { queryResult, fieldPacket };
    } finally {
      await pool.end();
    }
  } catch (error) {
    const errorMessage = `Error in execute at sql-exec service: ${String(error)}`;
    console.error(errorMessage);
    throw new errors.Service(errorMessage);
  }
};

export const service = {
  execute,
};
