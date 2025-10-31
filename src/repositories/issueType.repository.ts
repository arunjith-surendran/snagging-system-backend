
import { paginate } from "../helper/pagination.helper";
import { IIssueType } from "../models/issueTypes/issueType.model";
import { issue_types } from "../models/issueTypes/issueType.schema";

/**
 * ✅ Get all issue types (Paginated)
 * @param {number} pageNumber - Current page number
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<{ issueTypes: IIssueType[]; totalCount: number; hasNext: boolean }>}
 * @description Repository function that retrieves paginated issue types from the database.
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

export default {
  getAllIssueTypes,
};
