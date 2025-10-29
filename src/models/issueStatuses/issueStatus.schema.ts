import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// 🧱 SQL Table Definition
export const issueStatuses = pgTable(
  "issue_statuses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    documentStatus: text("document_status").default("active"), // optional logical flag
    statusName: text("status_name").notNull(), // e.g. Open, Fixed, Verified, Reopened, Closed

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
    uniqueIndex("uq_issue_statuses_name").on(t.statusName),
  ]
);

// 🧩 TypeScript Models
export type IssueStatus = InferSelectModel<typeof issueStatuses>;   // SELECT result type
export type NewIssueStatus = InferInsertModel<typeof issueStatuses>; // INSERT payload type
