import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { teams } from "../teams/teams.schema";
import { UserRole } from "../../types/user";

/**
 * ✅ Enum for user roles
 */
export const userRoleEnum = pgEnum("user_role", [
  UserRole.SUPER_ADMIN_ADMIN,
  UserRole.INSPECTOR_TEAM,
  UserRole.CONTRACTOR_TEAM,
  UserRole.SUB_CONTRACTOR_TEAM,
  UserRole.QA_VERIFY_TEAM,
]);

/**
 * ✅ Users table schema
 */
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: boolean("document_status").notNull().default(true),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    userRole: userRoleEnum("user_role").notNull(),

    // 🧩 Relationship
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
    teamName: text("team_name"),
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
  (t) => [uniqueIndex("uq_users_email").on(t.email)]
);

/**
 * ✅ Type definitions
 */
export type User = InferSelectModel<typeof users> & {
  teamName?: string | null; // ✅ Virtual/computed field from join
};

export type NewUser = InferInsertModel<typeof users>;
