-- 001_create_projects.sql
-- Creates the 'projects' table in the 'mcp_project_context' database

USE mcp_project_context;

CREATE TABLE `projects` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`project_name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`description` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`project_status` ENUM('active','paused','completed','archived') NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`created_at` TIMESTAMP NULL DEFAULT (now()),
	`updated_at` TIMESTAMP NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `unique_project_name` (`project_name`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;
