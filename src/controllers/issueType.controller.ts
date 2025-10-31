import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";

import { issueTypeService } from "../services";
import { IIssueType } from "../models/issueTypes/issueType.model";

/**
 * ✅ Get all issue types (Admin only)
 * @route GET /api/v1/issue-types
 * @access Admin
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next middleware
 * @description Fetches paginated list of issue types from the database.
 */
const getAllIssueTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pageNumber = parseInt((req.query.pageNumber as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);

    const { issueTypes, hasNext, totalCount } = await issueTypeService.getAllIssueTypes(pageNumber, pageSize);

    const apiResponse: ApiResponse<{
      issueTypes: IIssueType[];
      hasNext: boolean;
      totalCount: number;
    }> = new ApiResponse();

    apiResponse.message = "Issue types fetched successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = { issueTypes, hasNext, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllIssueTypes,
};
