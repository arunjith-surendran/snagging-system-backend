// src/models/projects/projects.schema.ts
import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // 🔒 Document Status
    documentStatus: boolean("document_status").notNull().default(true),

    // 🏗️ Project Info
    projectCode: text("project_code").notNull(),
    projectName: text("project_name").notNull(),
    description: text("description"),
    clientName: text("client_name"),

  },
  (t) => [uniqueIndex("uq_projects_code").on(t.projectCode)]
);

// ✅ Drizzle Types
export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;
