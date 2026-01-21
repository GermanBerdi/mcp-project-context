import { z } from "zod";
import { rowSchema } from "./row-schema.js";

export const updateReqSchema = z
  .object({})
  .extend(rowSchema.fields.pick({ id: true }).shape)
  .extend({
    connection_name: rowSchema.fields.shape.connection_name.optional(),
    connection_type: rowSchema.fields.shape.connection_type.optional(),
    host: rowSchema.fields.shape.host.optional(),
    port: rowSchema.fields.shape.port.optional(),
    database_name: rowSchema.fields.shape.database_name.optional(),
    username: rowSchema.fields.shape.username.optional(),
    password: rowSchema.fields.shape.password.optional(),
    extra_config: rowSchema.fields.shape.extra_config.optional(),
  })
  .describe(
    "Updates an existing database connection in the database. Required: 'id' (number). Optional: 'connection_name', 'connection_type', 'host', 'port', 'database_name', 'username', 'password', 'extra_config'. At least one optional field must be provided.",
  );
