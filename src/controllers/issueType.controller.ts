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
    const pageNumber = parseInt((req.query.pageNumber as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);

    const { issueTypes, hasNext, totalCount } = await issueTypeService.getAllIssueTypes(userId, pageNumber, pageSize);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue types fetched successfully!";
    apiResponse.data = { issueTypes, hasNext, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Issue Type by ID
 * @route GET /api/v1/issue-types/get/:id
 * @access Admin
 */
const getIssueTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const issueType = await issueTypeService.getIssueTypeById(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue type fetched successfully!";
    apiResponse.data = issueType;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Create Issue Type
 * @route POST /api/v1/issue-types/create
 * @access Admin
 */
const createIssueType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const newIssueType = await issueTypeService.createIssueType(userId, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 201;
    apiResponse.message = "✅ Issue type created successfully!";
    apiResponse.data = newIssueType;

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update Issue Type
 * @route PUT /api/v1/issue-types/update/:id
 * @access Admin
 */
const updateIssueType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const updatedIssueType = await issueTypeService.updateIssueType(userId, id, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue type updated successfully!";
    apiResponse.data = updatedIssueType;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete Issue Type
 * @route DELETE /api/v1/issue-types/delete/:id
 * @access Admin
 */
const deleteIssueType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    await issueTypeService.deleteIssueType(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "🗑️ Issue type deleted successfully!";
    apiResponse.data = { id };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllIssueTypes,
  getIssueTypeById,
  createIssueType,
  updateIssueType,
  deleteIssueType,
};
