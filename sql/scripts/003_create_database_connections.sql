-- 003_create_database_connections.sql
-- Creates the 'database_connections' table in the 'mcp_project_context' database

USE mcp_project_context;

CREATE TABLE `database_connections` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`project_id` INT NOT NULL,
	`connection_name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`connection_type` ENUM('mysql', 'postgresql', 'mongodb', 'redis', 'mariadb', 'sqlite') NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`host` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`port` INT NOT NULL,
	`database_name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`username` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`extra_config` JSON NULL,
	`created_at` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `project_id` (`project_id`) USING BTREE,
	INDEX `connection_type` (`connection_type`) USING BTREE,
	UNIQUE INDEX `unique_connection_per_project` (`project_id`, `connection_name`) USING BTREE,
	CONSTRAINT `database_connections_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;
