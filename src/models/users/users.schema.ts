import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { teams } from "../teams/teams.schema";

// 🧱 SQL Table Definition
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: text("document_status").default("active"), // active | archived | deleted
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    userRole: text("user_role"),

    teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),

    isProjectAdmin: boolean("is_project_admin").notNull().default(false),
    isTeamAdmin: boolean("is_team_admin").notNull().default(false),

    createdUser: text("created_user"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedUser: text("updated_user"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("uq_users_email").on(t.email),
  ]
);

// 🧩 TypeScript Models
export type User = InferSelectModel<typeof users>;   // SELECT result type
export type NewUser = InferInsertModel<typeof users>; // INSERT payload type
