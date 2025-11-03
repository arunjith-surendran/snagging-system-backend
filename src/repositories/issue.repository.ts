import { db } from '../db_connection/postgres/connection';
import { paginate } from '../helper/pagination.helper';
import { eq, or } from 'drizzle-orm';
import { issues } from '../models/issues/issues.schema';
import { IIssue } from '../models/issues/issues.model';
import IssueEntity from '../entities/issue.entity';

/**
 * ✅ Get all issues (Paginated)
 * @param {number} pageNumber - Page number
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<{ issues: IIssue[]; totalCount: number; hasNext: boolean }>}
 * @description Returns paginated list of all issues.
 */
const getAllIssues = async (pageNumber: number, pageSize: number): Promise<{ issues: IIssue[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<IIssue>(issues, {
    pageNumber,
    pageSize,
  });
  return { issues: data, totalCount, hasNext };
};

/**
 * ✅ Find Issue by ID
 * @param {string} id - Issue ID
 * @returns {Promise<IIssue | null>}
 * @description Retrieves an issue record by its ID.
 */
const findById = async (id: string): Promise<IIssue | null> => {
  const result = await db.select().from(issues).where(eq(issues.id, id));
  return result.length ? (result[0] as IIssue) : null;
};

/**
 * ✅ Create Issue
 * @param {IssueEntity} newIssue - Instance of IssueEntity containing issue data
 * @returns {Promise<IIssue>}
 * @description Inserts a new issue record into the database using IssueEntity.
 */
const createIssue = async (newIssue: IssueEntity): Promise<IIssue> => {
  // 🧹 Replace nulls with undefined for DB insert compatibility
  const cleanedIssue = Object.fromEntries(
    Object.entries(newIssue).map(([key, value]) => [key, value ?? undefined])
  ) as typeof issues.$inferInsert; // ✅ assert correct Drizzle insert type

  // 🚀 Insert into DB and return the inserted record
  const [inserted] = await db.insert(issues).values(cleanedIssue).returning();

  return inserted as IIssue;
};
/**
 * ✅ Update Issue by ID
 * @param {string} id - Issue ID
 * @param {Partial<IIssue>} updatedData - Fields to update
 * @returns {Promise<IIssue>}
 * @description Updates an existing issue record by its ID.
 */
const updateIssue = async (id: string, updatedData: Partial<IIssue>): Promise<IIssue> => {
  const cleanedUpdate = Object.fromEntries(Object.entries(updatedData).filter(([_, v]) => v !== null && v !== undefined));

  const [updated] = await db
    .update(issues)
    .set(cleanedUpdate as typeof issues.$inferInsert)
    .where(eq(issues.id, id))
    .returning();

  return updated as IIssue;
};

/**
 * ✅ Delete Issue by ID
 * @param {string} id - Issue ID
 * @returns {Promise<void>}
 * @description Permanently deletes an issue record.
 */
const deleteIssue = async (id: string): Promise<void> => {
  await db.delete(issues).where(eq(issues.id, id));
};

/**
 * ✅ Get Issues by Inspector
 * @param {string} userId - Inspector user ID
 * @returns {Promise<IIssue[]>}
 * @description Fetches issues created by or assigned to the inspector.
 */
const getIssuesByInspector = async (userId: string): Promise<IIssue[]> => {
  const data = await db
    .select()
    .from(issues)
    .where(or(eq(issues.createdByUser, userId), eq(issues.assignedUser, userId)));

  return data as IIssue[];
};

/**
 * ✅ Get Issues by Contractor
 * @param {string} userId - Contractor user ID
 * @returns {Promise<IIssue[]>}
 * @description Fetches issues assigned to the contractor team.
 */
const getIssuesByContractor = async (userId: string): Promise<IIssue[]> => {
  const data = await db.select().from(issues).where(eq(issues.assignedUser, userId));
  return data as IIssue[];
};

/**
 * ✅ Get Issues by Sub-Contractor
 * @param {string} userId - Sub-contractor user ID
 * @returns {Promise<IIssue[]>}
 * @description Fetches issues assigned to the sub-contractor team.
 */
const getIssuesBySubContractor = async (userId: string): Promise<IIssue[]> => {
  const data = await db.select().from(issues).where(eq(issues.assignedUser, userId));
  return data as IIssue[];
};

/**
 * ✅ Get Issues for QA Verification
 * @param {string} userId - QA user ID
 * @returns {Promise<IIssue[]>}
 * @description Fetches issues ready for QA/verification review.
 */
const getIssuesForVerification = async (userId: string): Promise<IIssue[]> => {
  const data = await db.select().from(issues).where(eq(issues.assignedUser, userId));
  return data as IIssue[];
};

export default {
  getAllIssues,
  findById,
  createIssue,
  updateIssue,
  deleteIssue,
  getIssuesByInspector,
  getIssuesByContractor,
  getIssuesBySubContractor,
  getIssuesForVerification,
};
