import { pgTable, uuid, text, integer, timestamp, index, unique } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { projects } from '../projects/projects.schema';

// 🧱 SQL Table Definition
export const buildings = pgTable(
  'buildings',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    documentStatus: text('document_status').default('active'), // optional field if you want to track logical deletion
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),

    buildingCode: text('building_code').notNull(), // "T1", "Block-A"
    buildingName: text('building_name').notNull(), // "Tower 1"
    floors: integer('floors'),
    address: text('address'),

    createdUser: text('created_user'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedUser: text('updated_user'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // ✅ Unique index for (project_id + building_code)
    unique('uq_buildings_project_code').on(t.projectId, t.buildingCode),

    // ✅ Index for project
    index('idx_buildings_project').on(t.projectId),
  ],
);

// 🧩 TypeScript Models
export type Building = InferSelectModel<typeof buildings>; // SELECT result type
export type NewBuilding = InferInsertModel<typeof buildings>; // INSERT payload type
