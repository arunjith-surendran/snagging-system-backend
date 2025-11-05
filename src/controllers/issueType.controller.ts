import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { issueTypeService } from "../services";


/**
 * ✅ Get All Issue Types
 * @route GET /api/v1/issue-types/get-all
 * @access Admin
 */
const getAllIssueTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    const { issueTypes, totalCount } = await issueTypeService.getAllIssueTypes(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue types fetched successfully!";
    apiResponse.data = { issueTypes, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};


export default {
  getAllIssueTypes,
  // getIssueTypeById,
  // createIssueType,
  // updateIssueType,
  // deleteIssueType,
};
