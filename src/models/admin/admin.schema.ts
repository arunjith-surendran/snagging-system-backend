import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const admins = pgTable(
  "admins",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: boolean("document_status").notNull().default(true),
    adminUserName: text("admin_user_name").notNull(),
    adminUserType: text("admin_user_type").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),

    createdUser: text("created_user"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedUser: text("updated_user"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    uniqueIndex("uq_admins_email").on(t.email), // ensure unique email
  ]
);

// ✅ Type helpers
export type Admin = InferSelectModel<typeof admins>;   // For SELECT queries
export type NewAdmin = InferInsertModel<typeof admins>; // For INSERT queries
