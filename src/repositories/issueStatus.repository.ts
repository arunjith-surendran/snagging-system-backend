import { db } from '../db_connection/postgres/connection';
import { paginate } from '../helper/pagination.helper';
import { eq } from 'drizzle-orm';
import { IssueStatus, issueStatuses, NewIssueStatus } from '../models/issueStatuses/issueStatus.schema';
import IssueStatusEntity from '../entities/issue.status.entity';

/**
 * ✅ Insert Multiple Issue Statuses (Bulk Upload)
 * @function bulkInsert
 * @description Inserts multiple issue status records and skips duplicates by statusName.
 * @param {NewIssueStatus[]} data - Array of new issue status objects
 * @returns {Promise<number>} - Number of records inserted
 */
const bulkInsert = async (data: NewIssueStatus[]): Promise<number> => {
  if (!data.length) {
    console.warn('⚠️ No data received for issue status insert.');
    return 0;
  }

  try {
    const result = await db
      .insert(issueStatuses)
      .values(data)
      .onConflictDoNothing({ target: issueStatuses.statusName }) // skip duplicates
      .returning({ id: issueStatuses.id, statusName: issueStatuses.statusName });

    console.log(
      `✅ Inserted ${result.length} status(es):`,
      result.map((r) => r.statusName),
    );
    return result.length;
  } catch (err) {
    console.error('❌ Failed to insert issue statuses:', err);
    throw err;
  }
};

/**
 * ✅ Get All Issue Statuses (Paginated)
 * @function getAllStatuses
 * @description Retrieves paginated issue status records.
 */
const getAllStatuses = async (pageNumber: number, pageSize: number): Promise<{ statuses: IssueStatus[]; totalCount: number; hasNext: boolean }> => {
  const { data, totalCount, hasNext } = await paginate<IssueStatus>(issueStatuses, {
    pageNumber,
    pageSize,
  });

  return { statuses: data, totalCount, hasNext };
};

/**
 * ✅ Get All Issue Statuses for Export
 * @function getAllForExport
 * @description Fetches all issue status records without pagination.
 * @returns {Promise<IssueStatus[]>}
 */
const getAllForExport = async (): Promise<IssueStatus[]> => {
  const result = await db.select().from(issueStatuses);
  return result;
};

/**
 * ✅ Create Issue Status
 * @function createStatus
 * @param {IssueStatusEntity} newStatus - Entity object for insertion
 * @returns {Promise<IssueStatus>} - Created record
 * @description Inserts a single issue status.
 */
const createStatus = async (newStatus: IssueStatusEntity): Promise<IssueStatus> => {
  const cleaned: NewIssueStatus = {
    documentStatus: newStatus.documentStatus,
    statusName: newStatus.statusName,
    fullName: newStatus.fullName,
    allowHigherRoles: newStatus.allowHigherRoles,
    isActive: newStatus.isActive,
    createdUser: newStatus.createdUser ?? undefined,
    createdAt: newStatus.createdAt ?? new Date(),
    updatedUser: newStatus.updatedUser ?? undefined,
    updatedAt: newStatus.updatedAt ?? new Date(),
  };

  const [inserted] = await db.insert(issueStatuses).values(cleaned).returning();
  return inserted;
};

/**
 * ✅ Find Issue Status by ID
 * @function findById
 * @param {string} id - Status ID
 * @returns {Promise<IssueStatus | null>}
 */
const findById = async (id: string): Promise<IssueStatus | null> => {
  const result = await db.select().from(issueStatuses).where(eq(issueStatuses.id, id));
  return result.length ? result[0] : null;
};

/**
 * ✅ Update Issue Status
 * @function updateStatus
 * @param {string} id - Status ID
 * @param {Partial<NewIssueStatus>} updatedData - Fields to update
 * @returns {Promise<IssueStatus>} - Updated record
 */
const updateStatus = async (id: string, updatedData: Partial<NewIssueStatus>): Promise<IssueStatus> => {
  const [updated] = await db.update(issueStatuses).set(updatedData).where(eq(issueStatuses.id, id)).returning();

  return updated;
};

/**
 * ✅ Delete Issue Status
 * @function deleteStatus
 * @param {string} id - Status ID to delete
 * @returns {Promise<void>}
 */
const deleteStatus = async (id: string): Promise<void> => {
  await db.delete(issueStatuses).where(eq(issueStatuses.id, id));
};

export default {
  bulkInsert,
  getAllStatuses,
  getAllForExport,
  createStatus,
  findById,
  updateStatus,
  deleteStatus,
};
