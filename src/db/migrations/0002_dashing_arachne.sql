CREATE TABLE `dim_grouping_sort_order` (
	`id` int AUTO_INCREMENT NOT NULL,
	`profile_uid` varchar(255),
	`grouping_id` int,
	`group_sort_order` int,
	CONSTRAINT `dim_grouping_sort_order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `dim_profile` RENAME COLUMN `is_animations_disabled` TO `is_animations_enabled`;--> statement-breakpoint
ALTER TABLE `dim_profile` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `dim_profile` MODIFY COLUMN `mail` varchar(255);--> statement-breakpoint
ALTER TABLE `dim_profile` MODIFY COLUMN `password` varchar(255);--> statement-breakpoint
ALTER TABLE `dim_profile` MODIFY COLUMN `uid` varchar(36);--> statement-breakpoint
ALTER TABLE `dim_profile` MODIFY COLUMN `default_cardio_page` varchar(255) NOT NULL DEFAULT 'running';--> statement-breakpoint
ALTER TABLE `dim_profile` MODIFY COLUMN `is_animations_enabled` tinyint NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `fitness_stat_table` ADD `is_date_locked` tinyint DEFAULT 0 NOT NULL;