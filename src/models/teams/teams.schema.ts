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
import { UserRole } from "../../types/user";

export const teamRoleEnum = pgEnum("team_role_enum", [
  UserRole.SUPER_ADMIN_ADMIN,
  UserRole.INSPECTOR_TEAM,
  UserRole.CONTRACTOR_TEAM,
  UserRole.SUB_CONTRACTOR_TEAM,
  UserRole.QA_VERIFY_TEAM,
]);

export const teams = pgTable(
  "teams",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    documentStatus: boolean("document_status").notNull().default(true),

    // ✅ Only `teamName` is required
    teamName: text("team_name").notNull(),

    // ✅ All other fields optional
    teamInitials: text("team_initials"),
    teamType: text("team_type"), // plain string (optional)
    teamAddress: text("team_address"),
    teamTelephone: text("team_telephone"),
    teamEmail: text("team_email"),
    teamRole: teamRoleEnum("team_role").default(UserRole.CONTRACTOR_TEAM), // optional, default
    active: boolean("active").notNull().default(true),

    createdUser: text("created_user"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedUser: text("updated_user"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("uq_teams_team_name").on(t.teamName)]
);

export type Team = InferSelectModel<typeof teams>;
export type NewTeam = InferInsertModel<typeof teams>;
