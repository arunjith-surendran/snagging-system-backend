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

export enum UserRole {
  SUPER_ADMIN = "Super Admin/Admin",          // T1
  INSPECTOR_TEAM = "Inspector Team",          // T2
  CONTRACTOR_TEAM = "Contractor Team",        // T3
  SUB_CONTRACTOR_TEAM = "Sub-Contractor Team",// T4
  QA_VERIFY_TEAM = "Inspector/Verify Team",   // T5
}


export const userRoleEnum = pgEnum("user_role", [
  UserRole.SUPER_ADMIN,
  UserRole.INSPECTOR_TEAM,
  UserRole.CONTRACTOR_TEAM,
  UserRole.SUB_CONTRACTOR_TEAM,
  UserRole.QA_VERIFY_TEAM,
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: text("document_status").default("active"), // active | archived | deleted

    fullName: text("full_name").notNull(),
    email: text("email").notNull(),

    // Strictly typed Enum — only valid UserRole values allowed
    userRole: userRoleEnum("user_role").notNull(),

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
  (t) => [uniqueIndex("uq_users_email").on(t.email)]
);

//
// ✅ 4️⃣ Infer TypeScript Models
//
export type User = InferSelectModel<typeof users>;   // For SELECT queries
export type NewUser = InferInsertModel<typeof users>; // For INSERT payloads
