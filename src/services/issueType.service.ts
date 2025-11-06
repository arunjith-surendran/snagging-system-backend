import IssueTypeEntity from '../entities/issueType.entity';
import { IIssueType } from '../models/issueTypes/issueType.model';
import { issueTypeRepository } from '../repositories';
import {
  
  validateRequiredField,
  validateUserAuthorization,
  validateNotFound,
} from '../utils/validators';

/**
 * ✅ Get All Issue Types (Paginated)
 * @function getAllIssueTypes
 * @param {string} userId - Authenticated user ID
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<{ issueTypes: IIssueType[]; hasNext: boolean; totalCount: number }>}
 * @description Fetches paginated list of issue types for Admins.
 */
const getAllIssueTypes = async (
  userId: string,
  pageNumber: number,
  pageSize: number,
): Promise<{ issueTypes: IIssueType[]; hasNext: boolean; totalCount: number }> => {
  validateUserAuthorization(userId);
  const { issueTypes, totalCount, hasNext } = await issueTypeRepository.getAllIssueTypes(pageNumber, pageSize);
  return { issueTypes, hasNext, totalCount };
};

/**
 * ✅ Get Issue Type by ID
 * @function getIssueTypeById
 * @param {string} userId - Authenticated user ID
 * @param {string} id - Issue Type ID
 * @returns {Promise<IIssueType>}
 * @description Fetches a single issue type by its ID.
 */
const getIssueTypeById = async (userId: string, id: string): Promise<IIssueType> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, "issueTypeId");
  const issueType = await issueTypeRepository.findById(id);
  validateNotFound(issueType, "Issue Type");
  return issueType as IIssueType;
};

/**
 * ✅ Create New Issue Type
 * @function createIssueType
 * @param {string} userId - Authenticated user ID
 * @param {IIssueType} issueTypeData - Issue type details
 * @returns {Promise<IIssueType>} - Created issue type record
 * @description Creates a new issue type record.
 */
const createIssueType = async (userId: string, issueTypeData: IIssueType): Promise<IIssueType> => {
  validateUserAuthorization(userId);
  validateRequiredField(issueTypeData.category, 'category');
  validateRequiredField(issueTypeData.type, 'type');
  validateRequiredField(issueTypeData.item, 'item');

  const issueTypeEntity = new IssueTypeEntity(
    issueTypeData.documentStatus ?? 'active',
    issueTypeData.category.trim(),
    issueTypeData.type.trim(),
    issueTypeData.item.trim(),
    issueTypeData.current ?? true,
    userId,
    new Date(),
    userId,
    new Date(),
  );

  const created = await issueTypeRepository.createIssueType(issueTypeEntity);
  return created;
};

/**
 * ✅ Update Existing Issue Type
 * @function updateIssueType
 * @param {string} userId - Authenticated user ID
 * @param {string} id - Issue Type ID
 * @param {Partial<IIssueType>} updatedData - Updated data
 * @returns {Promise<IIssueType>}
 * @description Updates an existing issue type record by its ID.
 */
const updateIssueType = async (
  userId: string,
  id: string,
  updatedData: Partial<IIssueType>,
): Promise<IIssueType> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'issueTypeId');

  const existing = await issueTypeRepository.findById(id);
  validateNotFound(existing, 'Issue Type');

  const updatedIssueType = {
    ...updatedData,
    updatedUser: userId,
    updatedAt: new Date(),
  };

  const updated = await issueTypeRepository.updateIssueType(id, updatedIssueType);
  return updated;
};

/**
 * ✅ Delete Issue Type
 * @function deleteIssueType
 * @param {string} userId - Authenticated user ID
 * @param {string} id - Issue Type ID
 * @returns {Promise<void>}
 * @description Deletes a specific issue type from the database.
 */
const deleteIssueType = async (userId: string, id: string): Promise<void> => {
  validateUserAuthorization(userId);
  validateRequiredField(id, 'issueTypeId');

  const existing = await issueTypeRepository.findById(id);
  validateNotFound(existing, 'Issue Type');

  await issueTypeRepository.deleteIssueType(id);
};

export default {
  getAllIssueTypes,
  getIssueTypeById,
  createIssueType,
  updateIssueType,
  deleteIssueType,
};
