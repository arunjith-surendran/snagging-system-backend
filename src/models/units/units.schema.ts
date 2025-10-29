import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { buildings } from "../buildings/buildings.schema";
import { projects } from "../projects/projects.schema";

// 🧱 SQL Table Definition
export const units = pgTable(
  "units",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    documentStatus: text("document_status").default("active"), // active | deleted | archived

    buildingId: uuid("building_id")
      .notNull()
      .references(() => buildings.id, { onDelete: "cascade" }),

    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),

    unitNumber: text("unit_number").notNull(),
    floorNumber: integer("floor_number"),
    bedrooms: integer("bedrooms"),
    areaSqft: numeric("area_sqft", { precision: 10, scale: 2 }),

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
    unique("uq_units_building_unit").on(t.buildingId, t.unitNumber),
    index("idx_units_building").on(t.buildingId),
    index("idx_units_floor").on(t.floorNumber),
  ]
);

// 🧩 TypeScript Models
export type Unit = InferSelectModel<typeof units>;   // SELECT result type
export type NewUnit = InferInsertModel<typeof units>; // INSERT payload type
