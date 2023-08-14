import { InferModel } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  int,
  json,
  double,
  date,
  tinyint,
  varbinary,
  datetime,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";

export const appData = mysqlTable("app_data", {
  id: int("id").notNull().autoincrement().primaryKey(),
  nameId: varchar("name_id", { length: 255 }),
  name: varchar("name", { length: 255 }),
  category: varchar("category", { length: 255 }),
  color: varchar("color", { length: 255 }),
});

export const cardioDisciplines = mysqlTable("cardio_disciplines", {
  disciplineId: int("discipline_id").notNull().autoincrement().primaryKey(),
  disciplineName: varchar("discipline_name", { length: 255 }),
});

export const cardioGrouping = mysqlTable("cardio_grouping", {
  groupId: int("group_id").notNull().autoincrement().primaryKey(),
  groupName: varchar("group_name", { length: 255 }),
  groupSortOrder: int("group_sort_order").notNull().default(3),
  profileGroupUid: varchar("profile_group_uid", { length: 255 }),
  disciplineId: int("discipline_id"),
});

export const cardioStatTable = mysqlTable("cardio_stat_table", {
  id: int("id").notNull().autoincrement().primaryKey(),
  uid: varchar("uid", { length: 36 }),
  name: varchar("name", { length: 255 }),
  discipline: varchar("discipline", { length: 255 }),
  distance: double("distance").notNull().default(0),
  updatedDate: date("updated_date"),
  isDateLocked: tinyint("is_date_locked").notNull().default(0),
  vas: int("vas").notNull().default(0),
  stroke: varchar("stroke", { length: 255 }),
  groupId: int("group_id").notNull().default(1),
  timeAmount: json("time_amount"),
  disciplineId: int("discipline_id").notNull().default(1),
  isSprint: tinyint("is_sprint").notNull().default(0),
  unitId: int("unit_id").notNull().default(1),
});

export const cardioUnits = mysqlTable("cardio_units", {
  unitId: int("unit_id").notNull().autoincrement().primaryKey(),
  unitName: varchar("unit_name", { length: 255 }),
  unitFullName: varchar("unit_full_name", { length: 255 }),
});

export const chatStatTable = mysqlTable("chat_stat_table", {
  id: int("id").notNull().autoincrement().primaryKey(),
  profile: varchar("profile", { length: 255 }),
  message: varbinary("message", { length: 8196 }),
  createdAt: datetime("created_at"),
});

export const competeStatTable = mysqlTable("compete_stat_table", {
  id: int("id").notNull().autoincrement().primaryKey(),
  uid: varchar("uid", { length: 36 }),
});

/* Should be deleted soon */
export const dimGrouping = mysqlTable("dim_grouping", {
  groupId: int("group_id").notNull().autoincrement().primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  groupName: varchar("group_name", { length: 255 }),
  groupSortOrder: int("group_sort_order"),
});
/* Should be deleted soon */
export const dimGroupingSortOrder = mysqlTable("dim_grouping_sort_order", {
  id: int("id").notNull().autoincrement().primaryKey(),
  profileUid: varchar("profile_uid", { length: 255 }),
  groupingId: int("grouping_id"),
  groupSortOrder: int("group_sort_order"),
});

export const dimProfile = mysqlTable("dim_profile", {
  id: int("id").notNull().autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  mail: varchar("mail", { length: 255 }),
  password: varchar("password", { length: 255 }),
  uid: varchar("uid", { length: 36 }),
  profileGroupId: int("profile_group_id"),
  isRepsDefault: tinyint("is_reps_default").notNull().default(0),
  isTextCentered: tinyint("is_text_centered").notNull().default(0),
  language: varchar("language", { length: 255 }).notNull().default("english"),
  showVasFitness: tinyint("show_vas_fitness").notNull().default(0),
  showVasCardio: tinyint("show_vas_cardio").notNull().default(0),
  isAnimationsEnabled: tinyint("is_animations_enabled").notNull().default(1),
  favorites: json("favorites"),
  role: varchar("role", { length: 255 }).notNull().default("user"),
  mostVisited: json("most_visited"),
  fitnessGroups: json("fitness_groups"),
  defaultCardioPage: varchar("default_cardio_page", { length: 255 })
    .notNull()
    .default("running"),
  cardioGroups: json("cardio_groups"),
});

export const dimProfileGroup = mysqlTable("dim_profile_group", {
  id: int("id").notNull().autoincrement().primaryKey(),
  fitnessApp: tinyint("fitness_app").notNull().default(1),
  hundApp: tinyint("hund_app").notNull().default(0),
  cardioApp: tinyint("cardio_app").notNull().default(1),
  competeApp: tinyint("compete_app").notNull().default(1),
  chatApp: tinyint("chat_app").notNull().default(0),
  lastName: varchar("last_name", { length: 255 }),
  availableApps: json("available_apps"),
  groupUid: varchar("group_uid", { length: 255 }),
  groupName: varchar("group_name", { length: 255 }),
  groupPassword: varchar("group_password", { length: 255 }),
});

export const dimRepsRange = mysqlTable("dim_reps_range", {
  repsRangeId: int("reps_range_id").notNull().autoincrement().primaryKey(),
  repsRangeName: varchar("reps_range_name", { length: 255 }),
  sortOrder: int("sort_order"),
});

export const dimUnits = mysqlTable("dim_units", {
  unitId: int("unit_id").notNull().autoincrement().primaryKey(),
  unitName: varchar("unit_name", { length: 255 }),
});

export const fitnessStatHistory = mysqlTable("fitness_stat_history", {
  statHistoryId: int("stat_history_id").notNull().autoincrement().primaryKey(),
  exercise: varchar("exercise", { length: 255 }),
  reps: double("reps"),
  max: double("max"),
  date: timestamp("date"),
  profileUid: varchar("profile_uid", { length: 255 }),
  profileName: varchar("profile_name", { length: 255 }),
  unit: varchar("unit", { length: 255 }),
  vasReps: int("vas_reps"),
  vasMax: int("vas_max"),
});

export const fitnessStatTable = mysqlTable("fitness_stat_table", {
  id: int("id").notNull().autoincrement().primaryKey(),
  uid: varchar("uid", { length: 255 }),
  name: varchar("name", { length: 255 }),
  max: double("max").notNull().default(0),
  reps: double("reps").notNull().default(0),
  updatedDateMax: date("updated_date_max"),
  updatedDateReps: date("updated_date_reps"),
  hasReps: tinyint("has_reps").notNull().default(1),
  hasMax: tinyint("has_max").notNull().default(1),
  groupIdMax: int("group_id_max").notNull().default(21),
  groupIdReps: int("group_id_reps").notNull().default(21),
  isCompeting: tinyint("is_competing").notNull().default(0),
  unitId: int("unit_id"),
  notesMax: text("notes_max"),
  notesReps: text("notes_reps"),
  repsRangeId: int("reps_range_id").notNull().default(1),
  vasReps: int("vas_reps").notNull().default(0),
  vasMax: int("vas_max").notNull().default(0),
  isDateLocked: tinyint("is_date_locked").notNull().default(0),
  profile: varchar("profile", { length: 255 }),
});
