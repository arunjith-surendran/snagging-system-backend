import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// 🧱 SQL Table Definition
export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: text("document_status").default("active"), // active | archived | deleted
    projectCode: text("project_code").notNull(),
    projectName: text("project_name").notNull(),
    description: text("description"),
    clientName: text("client_name"),

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
    uniqueIndex("uq_projects_code").on(t.projectCode),
  ]
);

// 🧩 TypeScript Models
export type Project = InferSelectModel<typeof projects>;   // SELECT result type
export type NewProject = InferInsertModel<typeof projects>; // INSERT payload type
