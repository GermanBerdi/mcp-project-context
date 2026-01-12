import mysql from "mysql2/promise";

export let pool: mysql.Pool;

export const initPool = (): void => {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === "true",
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
    queueLimit: Number(process.env.DB_QUEUE_LIMIT),
  });
};
