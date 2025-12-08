import { db } from '../db_connection/postgres/connection';
import { eq } from 'drizzle-orm';

import {
  IssueType,
  issueTypes,
  NewIssueType,
} from '../models/issueTypes/issueType.schema';

import IssueTypeEntity from '../entities/issueType.entity';

/**
 * ✅ Insert Multiple Issue Types (Bulk Upload)
 * @function bulkInsert
 * @description Inserts multiple issue type records and skips duplicates by (category, type, item)
 * @param {NewIssueType[]} data
 * @returns {Promise<number>}
 */
const bulkInsert = async (data: NewIssueType[]): Promise<number> => {
  if (!data.length) {
    console.warn('⚠️ No issue-type data received for insert.');
    return 0;
  }

  try {
    const result = await db
      .insert(issueTypes)
      .values(data)
      .onConflictDoNothing({
        target: [issueTypes.category, issueTypes.type, issueTypes.item],
      })
      .returning({
        id: issueTypes.id,
        category: issueTypes.category,
        type: issueTypes.type,
        item: issueTypes.item,
      });

    console.log(
      `✅ Inserted ${result.length} issue type(s):`,
      result.map((r) => `${r.category} → ${r.type} → ${r.item}`),
    );

    return result.length;
  } catch (err) {
    console.error('❌ Failed to insert issue types:', err);
    throw err;
  }
};

/**
 * ✅ Get All Issue Types (NO Pagination)
 * @function getAllTypes
 * @description Get all issue types (sorted)
 */
const getAllTypes = async (): Promise<IssueType[]> => {
  const result = await db.select().from(issueTypes);
  return result;
};

/**
 * ✅ Get All Issue Types for Export
 * @function getAllForExport
 * @returns {Promise<IssueType[]>}
 */
const getAllForExport = async (): Promise<IssueType[]> => {
  return await db.select().from(issueTypes);
};

/**
 * ✅ Create Issue Type
 * @function createType
 * @param {IssueTypeEntity} newType
 * @returns {Promise<IssueType>}
 */
const createType = async (newType: IssueTypeEntity): Promise<IssueType> => {
  const cleaned: NewIssueType = {
    category: newType.category,
    type: newType.type,
    item: newType.item,
    current: newType.current ?? true,

    createdUser: newType.createdUser ?? undefined,
    createdAt: new Date(),
    updatedUser: newType.createdUser ?? undefined,
    updatedAt: new Date(),
  };

  const [inserted] = await db.insert(issueTypes).values(cleaned).returning();
  return inserted;
};

/**
 * ✅ Find Issue Type by ID
 * @function findById
 */
const findById = async (id: string): Promise<IssueType | null> => {
  const result = await db
    .select()
    .from(issueTypes)
    .where(eq(issueTypes.id, id));

  return result.length ? result[0] : null;
};

/**
 * ✅ Update Issue Type
 * @function updateType
 */
const updateType = async (
  id: string,
  updatedData: Partial<NewIssueType>,
): Promise<IssueType> => {
  const [updated] = await db
    .update(issueTypes)
    .set(updatedData)
    .where(eq(issueTypes.id, id))
    .returning();

  return updated;
};

/**
 * ✅ Delete Issue Type
 * @function deleteType
 */
const deleteType = async (id: string): Promise<void> => {
  await db.delete(issueTypes).where(eq(issueTypes.id, id));
};

export default {
  bulkInsert,
  getAllTypes,
  getAllForExport,
  createType,
  findById,
  updateType,
  deleteType,
};
