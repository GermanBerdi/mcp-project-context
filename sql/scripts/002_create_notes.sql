-- 002_create_notes.sql
-- Creates the 'notes' table in the 'mcp_project_context' database

USE mcp_project_context;

CREATE TABLE `notes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`project_id` INT NOT NULL,
	`content` TEXT NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`created_at` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `project_id` (`project_id`) USING BTREE,
	CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB;