import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const issueTypes = pgTable(
  "issue_types",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    category: text("category").notNull(),  // e.g. Electrical
    type: text("type").notNull(),          // e.g. Switch
    item: text("item").notNull(),          // e.g. Light Switch

    current: boolean("current").notNull().default(true),

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
    uniqueIndex("uq_issue_types_combination").on(t.category, t.type, t.item),
  ]
);

// TYPES
export type IssueType = InferSelectModel<typeof issueTypes>;
export type NewIssueType = InferInsertModel<typeof issueTypes>;
