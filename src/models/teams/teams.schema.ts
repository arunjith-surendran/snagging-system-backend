import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// 🧱 SQL Table Definition
export const teams = pgTable(
  "teams",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: boolean("document_status").notNull().default(true),
    teamName: text("team_name").notNull(),          
    teamInitials: text("team_initials"),             
    teamType: text("team_type"),                    
    teamAddress: text("team_address"),
    teamTelephone: text("team_telephone"),
    teamEmail: text("team_email"),
    teamRole: text("team_role"),

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
  (t) => [
    uniqueIndex("uq_teams_name").on(t.teamName),
  ]
);

// 🧩 TypeScript Models
export type Team = InferSelectModel<typeof teams>;     // SELECT result type
export type NewTeam = InferInsertModel<typeof teams>;  // INSERT payload type
