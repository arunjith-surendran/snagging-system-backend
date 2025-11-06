import { db } from "../db_connection/postgres/connection";
import { paginate } from "../helper/pagination.helper";
import { IIssueType } from "../models/issueTypes/issueType.model";
import { issue_types } from "../models/issueTypes/issueType.schema";
import IssueTypeEntity from "../entities/issueType.entity";
import { eq } from "drizzle-orm";

/**
 * ✅ Get all issue types (Paginated)
 * @function getAllIssueTypes
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Items per page
 * @returns {Promise<{ issueTypes: IIssueType[]; totalCount: number; hasNext: boolean }>}
 * @description Fetches paginated issue types from the database.
 */
const getAllIssueTypes = async (
  pageNumber: number,
  pageSize: number
): Promise<{ issueTypes: IIssueType[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<IIssueType>(issue_types, {
    pageNumber,
    pageSize,
  });
  return { issueTypes: data, totalCount, hasNext };
};

/**
 * ✅ Find Issue Type by ID
 * @function findById
 * @param {string} id - Issue type ID
 * @returns {Promise<IIssueType | null>} - Found issue type or null if not found
 * @description Retrieves a specific issue type record from the database by its ID.
 */
const findById = async (id: string): Promise<IIssueType | null> => {
  const result = await db.select().from(issue_types).where(eq(issue_types.id, id));
  return result.length ? result[0] : null;
};

/**
 * ✅ Create New Issue Type
 * @function createIssueType
 * @param {IssueTypeEntity} data - New issue type entity object
 * @returns {Promise<IIssueType>} - Created issue type record
 * @description Inserts a new issue type into the database after cleaning null values.
 */
const createIssueType = async (data: IssueTypeEntity): Promise<IIssueType> => {
  // 🧹 Clean null → undefined for Drizzle ORM compatibility
  const cleanedData = Object.keys(data).reduce((acc, key) => {
    const value = (data as any)[key];
    if (value !== null && value !== undefined) {
      (acc as any)[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);

  // ✅ Assert type for Drizzle — use type assertion to satisfy schema
  const [inserted] = await db
    .insert(issue_types)
    .values(cleanedData as unknown as typeof issue_types.$inferInsert)
    .returning();

  return inserted;
};

/**
 * ✅ Update Issue Type by ID
 * @function updateIssueType
 * @param {string} id - Issue type ID
 * @param {Partial<IssueTypeEntity>} updatedData - Fields to update
 * @returns {Promise<IIssueType>} - Updated issue type record
 * @description Updates an existing issue type record by its ID after sanitizing null values.
 */
const updateIssueType = async (
  id: string,
  updatedData: Partial<IssueTypeEntity>
): Promise<IIssueType> => {
  const cleanedUpdate = Object.keys(updatedData).reduce((acc, key) => {
    const value = (updatedData as any)[key];
    if (value !== null && value !== undefined) {
      (acc as any)[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);

  const [updated] = await db
    .update(issue_types)
    .set(cleanedUpdate as unknown as typeof issue_types.$inferInsert)
    .where(eq(issue_types.id, id))
    .returning();

  return updated;
};

/**
 * ✅ Delete Issue Type by ID
 * @function deleteIssueType
 * @param {string} id - Issue type ID
 * @returns {Promise<void>}
 * @description Permanently deletes an issue type record from the database by its ID.
 */
const deleteIssueType = async (id: string): Promise<void> => {
  await db.delete(issue_types).where(eq(issue_types.id, id));
};

export default {
  getAllIssueTypes,
  findById,
  createIssueType,
  updateIssueType,
  deleteIssueType,
};
