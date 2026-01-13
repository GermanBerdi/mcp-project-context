-- 004_create_postman_configurations.sql
-- Creates the 'postman_configurations' table in the 'mcp_project_context' database

USE mcp_project_context;

CREATE TABLE `postman_configurations` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`project_id` INT NOT NULL,
	`configuration_name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`api_key` VARCHAR(512) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`workspace_id` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`collection_id` VARCHAR(255) NULL COLLATE 'utf8mb4_unicode_ci',
	`extra_config` JSON NULL,
	`created_at` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `project_id` (`project_id`) USING BTREE,
	UNIQUE INDEX `unique_config_per_project` (`project_id`, `configuration_name`) USING BTREE,
	CONSTRAINT `postman_configurations_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;
