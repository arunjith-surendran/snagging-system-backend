import {
  pgTable,
  uuid,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { projects } from "../projects/projects.schema";
import { units } from "../units/units.schema";
import { teams } from "../teams/teams.schema";
import { users } from "../users/users.schema";

// 🧱 SQL Table Definition
export const issues = pgTable(
  "issues",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: text("document_status").default("active"), // active | deleted | archived

    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),

    unitId: uuid("unit_id")
      .notNull()
      .references(() => units.id, { onDelete: "cascade" }),

    projectName: text("project_name").notNull(),
    unitNumber: text("unit_number").notNull(),

    // e.g., 'Open' | 'Fixed' | 'Verified' | 'Reopened' | 'Closed'
    status: text("status").notNull(),

    createdByTeam: uuid("created_by_team").references(() => teams.id, {
      onDelete: "set null",
    }),
    createdByUser: uuid("created_by_user").references(() => users.id, {
      onDelete: "set null",
    }),
    assignedTeam: uuid("assigned_team").references(() => teams.id, {
      onDelete: "set null",
    }),
    assignedUser: uuid("assigned_user").references(() => users.id, {
      onDelete: "set null",
    }),

    title: text("title").notNull(),
    description: text("description"),
    priority: text("priority").notNull().default("medium"),

    dueDate: timestamp("due_date", { withTimezone: true }),

    mediaBase64: text("media_base64"),
    mediaContentType: text("media_content_type"),

    comments: text("comments"),
    category: text("category"),
    issueType: text("issue_type"),
    issueItem: text("issue_item"),

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
    index("idx_issues_project").on(t.projectId),
    index("idx_issues_unit").on(t.unitId),
    index("idx_issues_status").on(t.status),
    index("idx_issues_assigned_team").on(t.assignedTeam),
    index("idx_issues_assigned_user").on(t.assignedUser),
    index("idx_issues_due").on(t.dueDate),
  ]
);

// 🧩 TypeScript Models
export type Issue = InferSelectModel<typeof issues>;   // SELECT result type
export type NewIssue = InferInsertModel<typeof issues>; // INSERT payload type
