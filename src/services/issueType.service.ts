// import IssueTypeEntity from '../entities/issueType.entity';
import { IIssueType } from '../models/issueTypes/issueType.model';
import { issueTypeRepository } from '../repositories';
import {
  
  // validateRequiredField,
  validateUserAuthorization,
  // validateNotFound,
} from '../utils/validators';

/**
 * ✅ Get All Issue Types (Paginated)
 * @function getAllIssueTypes
 * @param {string} userId - Authenticated user ID
 * @returns {Promise<{ issueTypes: IIssueType[]; hasNext: boolean; totalCount: number }>}
 * @description Fetches paginated list of issue types for Admins.
 */
const getAllIssueTypes = async (
  userId: string,
): Promise<{ issueTypes: IIssueType[]; totalCount: number }> => {
  validateUserAuthorization(userId);
  const { issueTypes, totalCount } = await issueTypeRepository.getAllIssueTypes();
  return { issueTypes, totalCount };
};
export default {
  getAllIssueTypes,
};
