import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const issueStatuses = pgTable(
  "issue_statuses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    documentStatus: boolean("document_status").notNull().default(true),
    statusName: text("status_name").notNull(),
    fullName: text("full_name").notNull(),

    allowHigherRoles: boolean("allow_higher_roles").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    createdUser: text("created_user"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedUser: text("updated_user"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("uq_issue_statuses_name").on(t.statusName)]
);

export type IssueStatus = InferSelectModel<typeof issueStatuses>;
export type NewIssueStatus = InferInsertModel<typeof issueStatuses>;
