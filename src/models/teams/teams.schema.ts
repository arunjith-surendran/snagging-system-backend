import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

/**
 * 🧱 Teams Table Schema
 * Defines structure for all team records.
 */
export const teams = pgTable(
  "teams",
  {
    // 🆔 Primary key (UUID auto-generated)
    id: uuid("id").defaultRandom().primaryKey(),

    // 📄 Document status
    documentStatus: boolean("document_status").notNull().default(true),

    // 🏷️ Team core info
    teamName: text("team_name").notNull(),           // Unique team name
    teamInitials: text("team_initials"),             // Optional initials
    teamType: text("team_type"),                     // Contractor, Consultant, etc.
    teamAddress: text("team_address"),
    teamTelephone: text("team_telephone"),
    teamEmail: text("team_email"),
    teamRole: text("team_role"),                     // Developer, QA, etc.

    // ✅ Active flag
    active: boolean("active").notNull().default(true),

    // 👤 Audit fields
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
    // 🧩 Add unique index to prevent duplicates in bulk uploads
    uniqueIndex("uq_teams_team_name").on(t.teamName),
  ]
);

/**
 * 🧩 TypeScript Models
 * Infer types directly from Drizzle schema
 */
export type Team = InferSelectModel<typeof teams>; // SELECT result type
export type NewTeam = InferInsertModel<typeof teams>; // INSERT payload type
