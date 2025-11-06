import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users } from "../users/users.schema";

/**
 * ✅ Enum: Token Types
 */
export const tokenTypeEnum = pgEnum("token_type", ["access", "refresh"]);

/**
 * ✅ Tokens Table
 * Stores issued access and refresh tokens linked to users.
 */
export const tokens = pgTable("tokens", {
  id: uuid("id").primaryKey().defaultRandom(),

  documentStatus: boolean("document_status").notNull().default(true),

  token: text("token").notNull(),

  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  type: tokenTypeEnum("type").notNull(),
  expires: timestamp("expires", { withTimezone: true }).notNull(),

  blacklisted: boolean("blacklisted").notNull().default(false),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Token = InferSelectModel<typeof tokens>;
export type NewToken = InferInsertModel<typeof tokens>;
