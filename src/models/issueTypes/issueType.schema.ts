import {
  pgTable,
  // uuid,
  text,
  boolean,
  // timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// 🧱 SQL Table Definition
export const issue_types = pgTable(
  "issue_types",
  {
    // id: uuid("id").primaryKey().defaultRandom(),
    category: text("Category").notNull(),  // e.g., Electrical, Plumbing
    type: text("Type").notNull(),          // e.g., Switches, Pipes
    item: text("Item").notNull(),          // e.g., Light switch, Faucet
    current: boolean("Current").notNull().default(true),
    // createdUser: text("created_user"),
    // createdAt: timestamp("created_at", { withTimezone: true })
    //   .notNull()
    //   .defaultNow(),
    // updatedUser: text("updated_user"),
    // updatedAt: timestamp("updated_at", { withTimezone: true })
    //   .notNull()
    //   .defaultNow(),
  },
  (t) => [
    // ✅ Unique index on Category + Type + Item
    uniqueIndex("uq_issue_types_combination").on(t.category, t.type, t.item),
  ]
);

// 🧩 TypeScript Models
export type IssueType = InferSelectModel<typeof issue_types>;   // SELECT result type
export type NewIssueType = InferInsertModel<typeof issue_types>; // INSERT payload type
