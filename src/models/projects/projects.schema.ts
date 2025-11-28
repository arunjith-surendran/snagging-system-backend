// src/models/projects/projects.schema.ts
import {
  pgTable,
  uuid,
  text,
  boolean,
  // timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // 🔒 Status
    documentStatus: boolean("document_status").notNull().default(true),

    // 🏗️ Project Info
    projectCode: text("project_code").notNull(),
    projectName: text("project_name").notNull(),
    description: text("description"),
    clientName: text("client_name"),
    // location: text("location"),
    // phase: text("phase"),

    // // 👥 Assigned Team References
    // assignedInspectorId: uuid("assigned_inspector_id"),
    // assignedContractorId: uuid("assigned_contractor_id"),
    // assignedSubContractorId: uuid("assigned_sub_contractor_id"),
    // assignedVerifierId: uuid("assigned_verifier_id"),

    // // 🗓️ Timeline
    // startDate: timestamp("start_date", { withTimezone: true }),
    // endDate: timestamp("end_date", { withTimezone: true }),

    // // 🧾 Audit Trail
    // createdUser: text("created_user"),
    // createdAt: timestamp("created_at", { withTimezone: true })
    //   .notNull()
    //   .defaultNow(),
    // updatedUser: text("updated_user"),
    // updatedAt: timestamp("updated_at", { withTimezone: true })
    //   .notNull()
    //   .defaultNow(),
  },
  (t) => [uniqueIndex("uq_projects_code").on(t.projectCode)]
);

// ✅ Drizzle Types
export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;
