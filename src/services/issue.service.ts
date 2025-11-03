import IssueEntity from "../entities/issue.entity";
import { IIssue, IssueStatus } from "../models/issues/issues.model";
import { issueRepository } from "../repositories";
import {
  validateRequiredField,
  validateUserAuthorization,
  validateNotFound,
} from "../utils/validators";

/**
 * ✅ Get All Issues
 * @param {string} userId - Authenticated user ID
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<{ issues: IIssue[]; totalCount: number; hasNext: boolean }>}
 * @description Fetches all issues with pagination.
 */
const getAllIssues = async (
  userId: string,
  pageNumber: number,
  pageSize: number
): Promise<{ issues: IIssue[]; totalCount: number; hasNext: boolean }> => {
  validateUserAuthorization(userId);
  const { issues, totalCount, hasNext } = await issueRepository.getAllIssues(
    pageNumber,
    pageSize
  );
  return { issues, totalCount, hasNext };
};

/**
 * ✅ Get Issue by ID
 * @param {string} userId - Authenticated user ID
 * @param {string} id - Issue ID
 * @returns {Promise<IIssue>}
 * @description Retrieves a specific issue by its ID.
 */
const getIssueById = async (userId: string, id: string): Promise<IIssue> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, "issueId");

  const issue = await issueRepository.findById(id);
  validateNotFound(issue, "Issue");

  return issue as IIssue;
};

/**
 * ✅ Create Issue
 * @param {string} userId - Authenticated user ID
 * @param {IIssue} issueData - Issue creation payload
 * @returns {Promise<IIssue>}
 * @description Creates a new issue record using IssueEntity (positional constructor).
 */
const createIssue = async (
  userId: string,
  issueData: IIssue
): Promise<IIssue> => {
  validateUserAuthorization(userId);
  validateRequiredField(issueData.title, "title");

  // 🧱 Construct IssueEntity using positional parameters
  const issueEntity = new IssueEntity(
    true, 
    issueData.projectId, // projectId
    issueData.unitId ?? "", // unitId
    issueData.projectName.trim(), // projectName
    issueData.unitNumber ?? "", // unitNumber
    issueData.status ?? "Open", // status
    issueData.createdByTeam ?? null, // createdByTeam
    issueData.createdByUser ?? userId, // createdByUser
    issueData.assignedTeam ?? null, // assignedTeam
    issueData.assignedUser ?? null, // assignedUser
    issueData.title.trim(), // title
    issueData.description ?? null, // description
    issueData.priority ?? "Medium", // priority
    issueData.dueDate ?? null, // dueDate
    issueData.mediaBase64 ?? null, // mediaBase64
    issueData.mediaContentType ?? null, // mediaContentType
    issueData.comments ?? null, // comments
    issueData.category ?? null, // category
    issueData.issueType ?? null, // issueType
    issueData.issueItem ?? null, // issueItem
    userId, // createdUser
    new Date(), // createdAt
    userId, // updatedUser
    new Date() // updatedAt
  );

  // 🚀 Save issue using repository
  const created = await issueRepository.createIssue(issueEntity);
  return created;
};

/**
 * ✅ Update Issue
 * @param {string} userId - Authenticated user ID
 * @param {string} id - Issue ID
 * @param {Partial<IIssue>} updatedData - Updated fields
 * @returns {Promise<IIssue>}
 * @description Updates an existing issue record.
 */
const updateIssue = async (
  userId: string,
  id: string,
  updatedData: Partial<IIssue>
): Promise<IIssue> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, "issueId");

  const existing = await issueRepository.findById(id);
  validateNotFound(existing, "Issue");

  const updatedIssue = {
    ...updatedData,
    updatedUser: userId,
    updatedAt: new Date(),
  };

  const updated = await issueRepository.updateIssue(id, updatedIssue);
  return updated;
};

/**
 * ✅ Delete Issue
 * @param {string} userId - Authenticated user ID
 * @param {string} id - Issue ID
 * @returns {Promise<void>}
 * @description Deletes an issue from the database.
 */
const deleteIssue = async (userId: string, id: string): Promise<void> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, "issueId");

  const existing = await issueRepository.findById(id);
  validateNotFound(existing, "Issue");

  await issueRepository.deleteIssue(id);
};

/**
 * ✅ Inspector Team - Get Issues by Inspector
 * @param {string} userId - Inspector user ID
 * @returns {Promise<IIssue[]>}
 * @description Returns all issues created or assigned to the inspector team/user.
 */
const getIssuesByInspector = async (userId: string): Promise<IIssue[]> => {
  validateUserAuthorization(userId);
  return await issueRepository.getIssuesByInspector(userId);
};

/**
 * ✅ Inspector Team - Create Issue for Project
 * @param {string} userId - Inspector user ID
 * @param {string} projectId - Associated project ID
 * @param {IIssue} issueData - Issue details
 * @returns {Promise<IIssue>}
 * @description Allows inspectors to create issues for assigned projects using IssueEntity.
 */
const createIssueByInspector = async (
  userId: string,
  projectId: string,
  issueData: IIssue
): Promise<IIssue> => {
  validateUserAuthorization(userId);
  validateRequiredField(projectId, "projectId");
  validateRequiredField(issueData.title, "title");

  // 🧱 Build IssueEntity instance
  const issueEntity = new IssueEntity(
    true,                                         // ✅ documentStatus (active by default)
    projectId,                                    // projectId
    issueData.unitId ?? "",                       // unitId
    issueData.projectName.trim(),                 // projectName
    issueData.unitNumber ?? "",                   // unitNumber
    issueData.status ?? "Open",                   // status
    issueData.createdByTeam ?? null,              // createdByTeam
    userId,                                       // createdByUser (inspector ID)
    issueData.assignedTeam ?? null,               // assignedTeam
    issueData.assignedUser ?? null,               // assignedUser
    issueData.title.trim(),                       // title
    issueData.description ?? null,                // description
    issueData.priority ?? "Medium",               // priority
    issueData.dueDate ?? null,                    // dueDate
    issueData.mediaBase64 ?? null,                // mediaBase64
    issueData.mediaContentType ?? null,           // mediaContentType
    issueData.comments ?? null,                   // comments
    issueData.category ?? null,                   // category
    issueData.issueType ?? null,                  // issueType
    issueData.issueItem ?? null,                  // issueItem
    userId,                                       // createdUser
    new Date(),                                   // createdAt
    userId,                                       // updatedUser
    new Date()                                    // updatedAt
  );

  // 🚀 Save to database via repository
  const created = await issueRepository.createIssue(issueEntity);
  return created;
};
/**
 * ✅ Contractor Team - Get Assigned Issues
 * @param {string} userId - Contractor user ID
 * @returns {Promise<IIssue[]>}
 * @description Returns all issues assigned to the contractor team.
 */
const getIssuesByContractor = async (userId: string): Promise<IIssue[]> => {
  validateUserAuthorization(userId);
  return await issueRepository.getIssuesByContractor(userId);
};

/**
 * ✅ Contractor Team - Update Issue Status
 * @param {string} userId - Contractor user ID
 * @param {string} issueId - Issue ID
 * @param {Partial<IIssue>} payload - Updated issue data
 * @returns {Promise<IIssue>}
 * @description Allows contractor to update issue status (Open → Fixed/In Progress).
 */
const updateIssueStatusByContractor = async (
  userId: string,
  issueId: string,
  payload: Partial<IIssue>
): Promise<IIssue> => {
  validateUserAuthorization(userId);
  validateRequiredField(issueId, "issueId");

  const existing = await issueRepository.findById(issueId);
  validateNotFound(existing, "Issue");

  const updated = await issueRepository.updateIssue(issueId, {
    ...payload,
    updatedUser: userId,
    updatedAt: new Date(),
  });

  return updated;
};

/**
 * ✅ Sub-Contractor Team - Get Assigned Issues
 * @param {string} userId - Sub-contractor user ID
 * @returns {Promise<IIssue[]>}
 * @description Returns issues assigned to the sub-contractor team.
 */
const getIssuesBySubContractor = async (userId: string): Promise<IIssue[]> => {
  validateUserAuthorization(userId);
  return await issueRepository.getIssuesBySubContractor(userId);
};

/**
 * ✅ Sub-Contractor Team - Update Issue Status
 * @param {string} userId - Sub-contractor user ID
 * @param {string} issueId - Issue ID
 * @param {Partial<IIssue>} payload - Updated issue data
 * @returns {Promise<IIssue>}
 * @description Allows sub-contractors to mark their assigned issues as Fixed or In Progress.
 */
const updateIssueStatusBySubContractor = async (
  userId: string,
  issueId: string,
  payload: Partial<IIssue>
): Promise<IIssue> => {
  validateUserAuthorization(userId);
  validateRequiredField(issueId, "issueId");

  const existing = await issueRepository.findById(issueId);
  validateNotFound(existing, "Issue");

  const updated = await issueRepository.updateIssue(issueId, {
    ...payload,
    updatedUser: userId,
    updatedAt: new Date(),
  });

  return updated;
};

/**
 * ✅ QA Verify Team - Get Issues for Verification
 * @param {string} userId - QA user ID
 * @returns {Promise<IIssue[]>}
 * @description Retrieves all issues assigned to QA team for verification or review.
 */
const getIssuesForVerification = async (userId: string): Promise<IIssue[]> => {
  validateUserAuthorization(userId);
  return await issueRepository.getIssuesForVerification(userId);
};

/**
 * ✅ QA Verify Team - Verify or Reopen Issue
 * @param {string} userId - QA user ID
 * @param {string} issueId - Issue ID
 * @param {Partial<IIssue>} payload - Update data (status, remarks, etc.)
 * @returns {Promise<IIssue>}
 * @description Allows QA/Verification team to close or reopen issues.
 */
const verifyOrReopenIssue = async (
  userId: string,
  issueId: string,
  payload: Partial<IIssue>
): Promise<IIssue> => {
  validateUserAuthorization(userId);
  validateRequiredField(issueId, "issueId");

  const existing = await issueRepository.findById(issueId);
  validateNotFound(existing, "Issue");

  if (
    ![IssueStatus.CLOSED, IssueStatus.REOPENED].includes(payload.status!)
  ) {
    throw new Error("Invalid status transition. Allowed: Closed or Reopened.");
  }

  const updated = await issueRepository.updateIssue(issueId, {
    ...payload,
    updatedUser: userId,
    updatedAt: new Date(),
  });

  return updated;
};

export default {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
  getIssuesByInspector,
  createIssueByInspector,
  getIssuesByContractor,
  updateIssueStatusByContractor,
  getIssuesBySubContractor,
  updateIssueStatusBySubContractor,
  getIssuesForVerification,
  verifyOrReopenIssue,
};
