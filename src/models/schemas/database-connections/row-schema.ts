import { z } from "zod";

import * as commonSchema from "../common/common-schema.js";

const id = commonSchema.id.describe(
  "The unique numeric identifier of the database connection, used to reference a specific connection record in the database.",
);

const project_id = commonSchema.id.describe(
  "The unique numeric identifier of the project this database connection belongs to. Must be a valid project ID that exists in the projects table.",
);

const connection_name = z
  .string()
  .min(1)
  .max(255)
  .describe(
    "The name/alias for this database connection (e.g., 'production-db', 'staging-mongo'). Must be unique within the project.",
  );

const connection_type = z
  .enum(["mysql", "postgresql", "mongodb", "redis", "mariadb", "sqlite"])
  .describe("The type of database system. Supported types: mysql, postgresql, mongodb, redis, mariadb, sqlite.");

const host = z.string().min(1).max(255).describe("The database host address (e.g., 'localhost', '192.168.1.100').");

const port = z
  .number()
  .int()
  .positive()
  .min(1)
  .max(65535)
  .describe("The database port number (e.g., 3306 for MySQL, 5432 for PostgreSQL, 27017 for MongoDB).");

const database_name = z
  .string()
  .min(1)
  .max(255)
  .describe("The name of the database to connect to (e.g., 'myapp_production').");

const username = z.string().min(1).max(255).describe("The username for database authentication.");

const password = z.string().min(1).max(255).describe("The password for database authentication.");

const extra_config = z
  .record(z.string(), z.any())
  .nullable()
  .describe(
    "Additional configuration as JSON object. Examples: MongoDB: {authSource: 'admin', replicaSet: 'rs0'}, PostgreSQL: {ssl: true, schema: 'public'}, Redis: {db: 0, tls: true}. Use null if no extra configuration is needed.",
  );

const created_at = z.instanceof(Date).describe("The timestamp when the database connection was created");

const updated_at = z.instanceof(Date).describe("The timestamp when the database connection was last updated");

const fields = z
  .object({
    id,
    project_id,
    connection_name,
    connection_type,
    host,
    port,
    database_name,
    username,
    password,
    extra_config,
    created_at,
    updated_at,
  })
  .describe("Represents a single row in the database_connections table with all key database connection attributes.");

export const rowSchema = { fields };
