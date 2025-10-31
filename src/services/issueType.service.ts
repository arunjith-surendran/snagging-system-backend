import { IIssueType } from "../models/issueTypes/issueType.model";
import { issueTypeRepository } from "../repositories";


/**
 * ✅ Get all issue types with pagination
 * @param {number} pageNumber - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ issueTypes: IIssueType[]; hasNext: boolean; totalCount: number }>}
 * @description Service layer that fetches paginated issue types from the repository.
 */
const getAllIssueTypes = async (
  pageNumber: number,
  pageSize: number
): Promise<{ issueTypes: IIssueType[]; hasNext: boolean; totalCount: number }> => {
  const { issueTypes, totalCount, hasNext } = await issueTypeRepository.getAllIssueTypes(pageNumber, pageSize);
  return { issueTypes, hasNext, totalCount };
};

export default {
  getAllIssueTypes,
};
