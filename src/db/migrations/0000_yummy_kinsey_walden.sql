CREATE TABLE `app_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name_id` varchar(255),
	`name` varchar(255),
	`category` varchar(255),
	`color` varchar(255),
	CONSTRAINT `app_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cardio_disciplines` (
	`discipline_id` int AUTO_INCREMENT NOT NULL,
	`discipline_name` varchar(255),
	CONSTRAINT `cardio_disciplines_discipline_id` PRIMARY KEY(`discipline_id`)
);
--> statement-breakpoint
CREATE TABLE `cardio_grouping` (
	`group_id` int AUTO_INCREMENT NOT NULL,
	`group_name` varchar(255),
	`group_sort_order` int NOT NULL DEFAULT 3,
	`profile_group_uid` varchar(255),
	`discipline_id` int,
	CONSTRAINT `cardio_grouping_group_id` PRIMARY KEY(`group_id`)
);
--> statement-breakpoint
CREATE TABLE `cardio_stat_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uid` varchar(36),
	`name` varchar(255),
	`discipline` varchar(255),
	`distance` double NOT NULL DEFAULT 0,
	`updated_date` date,
	`is_date_locked` tinyint NOT NULL DEFAULT 0,
	`vas` int NOT NULL DEFAULT 0,
	`stroke` varchar(255),
	`group_id` int NOT NULL DEFAULT 1,
	`time_amount` json,
	`discipline_id` int NOT NULL DEFAULT 1,
	`is_sprint` tinyint NOT NULL DEFAULT 0,
	`unit_id` int NOT NULL DEFAULT 1,
	CONSTRAINT `cardio_stat_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cardio_units` (
	`unit_id` int AUTO_INCREMENT NOT NULL,
	`unit_name` varchar(255),
	`unit_full_name` varchar(255),
	CONSTRAINT `cardio_units_unit_id` PRIMARY KEY(`unit_id`)
);
--> statement-breakpoint
CREATE TABLE `chat_stat_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`profile` varchar(255),
	`message` varbinary(8196),
	`created_at` datetime,
	CONSTRAINT `chat_stat_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `compete_stat_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uid` varchar(36),
	CONSTRAINT `compete_stat_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dim_grouping` (
	`group_id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`group_name` varchar(255),
	`group_sort_order` int,
	CONSTRAINT `dim_grouping_group_id` PRIMARY KEY(`group_id`)
);
--> statement-breakpoint
CREATE TABLE `dim_profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`mail` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`uid` varchar(36) NOT NULL,
	`profile_group_id` int,
	`is_reps_default` tinyint NOT NULL DEFAULT 0,
	`is_text_centered` tinyint NOT NULL DEFAULT 0,
	`language` varchar(255) NOT NULL DEFAULT 'english',
	`show_vas_fitness` tinyint NOT NULL DEFAULT 0,
	`show_vas_cardio` tinyint NOT NULL DEFAULT 0,
	`is_animations_disabled` tinyint NOT NULL DEFAULT 0,
	`favorites` json,
	`role` varchar(255) NOT NULL DEFAULT 'user',
	`most_visited` json,
	`fitness_groups` json,
	`default_cardio_page` varchar(255) NOT NULL,
	`cardio_groups` json,
	CONSTRAINT `dim_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dim_profile_group` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fitness_app` tinyint NOT NULL DEFAULT 1,
	`hund_app` tinyint NOT NULL DEFAULT 0,
	`cardio_app` tinyint NOT NULL DEFAULT 1,
	`compete_app` tinyint NOT NULL DEFAULT 1,
	`chat_app` tinyint NOT NULL DEFAULT 0,
	`last_name` varchar(255),
	`available_apps` json,
	`group_uid` varchar(255),
	`group_name` varchar(255),
	`group_password` varchar(255),
	CONSTRAINT `dim_profile_group_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dim_reps_range` (
	`reps_range_id` int AUTO_INCREMENT NOT NULL,
	`reps_range_name` varchar(255),
	`sort_order` int,
	CONSTRAINT `dim_reps_range_reps_range_id` PRIMARY KEY(`reps_range_id`)
);
--> statement-breakpoint
CREATE TABLE `dim_units` (
	`unit_id` int AUTO_INCREMENT NOT NULL,
	`unit_name` varchar(255),
	CONSTRAINT `dim_units_unit_id` PRIMARY KEY(`unit_id`)
);
--> statement-breakpoint
CREATE TABLE `fitness_stat_history` (
	`stat_history_id` int AUTO_INCREMENT NOT NULL,
	`exercise` varchar(255),
	`reps` double,
	`max` double,
	`date` timestamp,
	`profile_uid` varchar(255),
	`profile_name` varchar(255),
	`unit` varchar(255),
	`vas_reps` int,
	`vas_max` int,
	CONSTRAINT `fitness_stat_history_stat_history_id` PRIMARY KEY(`stat_history_id`)
);
--> statement-breakpoint
CREATE TABLE `fitness_stat_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uid` varchar(255),
	`name` varchar(255),
	`max` double NOT NULL DEFAULT 0,
	`reps` double NOT NULL DEFAULT 0,
	`updated_date_max` date,
	`updated_date_reps` date,
	`has_reps` tinyint NOT NULL DEFAULT 1,
	`has_max` tinyint NOT NULL DEFAULT 1,
	`group_id_max` int,
	`group_id_reps` int,
	`is_competing` tinyint NOT NULL DEFAULT 0,
	`unit_id` int,
	`notes_max` text,
	`notes_reps` text,
	`reps_range_id` int NOT NULL DEFAULT 1,
	`vas_reps` int NOT NULL DEFAULT 0,
	`vas_max` int NOT NULL DEFAULT 0,
	`profile` varchar(255),
	CONSTRAINT `fitness_stat_table_id` PRIMARY KEY(`id`)
);
