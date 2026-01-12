-- 000_drop_database.sql
-- ⚠️ WARNING: THIS WILL DELETE THE ENTIRE DATABASE "mcp_project_context"
-- Intended for local / dev environments only

DROP DATABASE IF EXISTS mcp_project_context;
CREATE DATABASE mcp_project_context
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
