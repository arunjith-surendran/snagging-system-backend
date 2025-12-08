import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { issueTypeService } from "../services";
import { AuthRequest } from "../middlewares/auth/verify-auth";

/**
 * ✅ Upload Issue Types (CSV / Excel)
 * @route POST /api/v1/issue-type/upload
 * @description Processes an uploaded Excel/CSV file and imports issue types into the database.
 * @param {Request} req - Express request containing uploaded file
 * @param {Response} res - Express response to return result
 * @param {NextFunction} next - Error handler middleware
 */
const uploadIssueTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const result = await issueTypeService.importIssueTypes(req.file.path, userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = `✅ File processed successfully! ${result.insertedCount} type(s) added.`;
    apiResponse.data = { insertedCount: result.insertedCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get All Issue Types
 * @route GET /api/v1/issue-type/get-all-types
 * @description Fetches all issue types (no pagination needed)
 * @param {Request} req - Express request with user session
 * @param {Response} res - Returns list of issue types with count
 * @param {NextFunction} next - Handles exceptions
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

/**
 * ✅ Download Issue Types as Excel
 * @route GET /api/v1/issue-type/download/excel
 * @description Generates downloadable Excel file containing all issue types
 * @param {AuthRequest} req - Authenticated user's request
 * @param {Response} res - Streams file response
 * @param {NextFunction} next - Error middleware
 */
const downloadIssueTypesExcel = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { fileName } = await issueTypeService.downloadIssueTypes("excel", res, userId);

    const apiResponse = new ApiResponse<{ fileName: string }>();
    apiResponse.statusCode = 200;
    apiResponse.message = "📄 Issue types exported successfully as Excel.";
    apiResponse.data = { fileName };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Download Issue Types as CSV
 * @route GET /api/v1/issue-type/download/csv
 * @description Generates downloadable CSV file of issue types
 * @param {AuthRequest} req - Request with authenticated user
 * @param {Response} res - Sends CSV file
 * @param {NextFunction} next - Handles exceptions
 */
const downloadIssueTypesCsv = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { fileName } = await issueTypeService.downloadIssueTypes("csv", res, userId);

    const apiResponse = new ApiResponse<{ fileName: string }>();
    apiResponse.statusCode = 200;
    apiResponse.message = "📄 Issue types exported successfully as CSV.";
    apiResponse.data = { fileName };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Add New Issue Type (Admin)
 * @route POST /api/v1/issue-type/admin/add
 * @description Admin creates a new issue type
 * @param {Request} req - Contains issue type payload
 * @param {Response} res - Returns created type
 * @param {NextFunction} next - Error middleware
 */
const addIssueType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    const createdType = await issueTypeService.addIssueType(userId, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 201;
    apiResponse.message = "✅ Issue type created successfully!";
    apiResponse.data = createdType;

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update Issue Type (Admin)
 * @route PUT /api/v1/issue-type/admin/update/:id
 * @description Updates a specific issue type by ID
 * @param {Request} req - Contains updated fields + ID param
 * @param {Response} res - Returns updated record
 * @param {NextFunction} next - Handles errors
 */
const updateIssueType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    const updated = await issueTypeService.updateIssueType(userId, id, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "🔄 Issue type updated successfully!";
    apiResponse.data = updated;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete Issue Type (Admin)
 * @route DELETE /api/v1/issue-type/admin/delete/:id
 * @description Removes a specific issue type from database
 * @param {Request} req - Contains ID of type to delete
 * @param {Response} res - Confirmation message
 * @param {NextFunction} next - Error handler
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

/**
 * ✅ Get Issue Type by ID (Admin)
 * @route GET /api/v1/issue-type/admin/get/:id
 * @description Returns details of a single issue type
 * @param {Request} req - Contains ID param
 * @param {Response} res - Returns full type details
 * @param {NextFunction} next - For exceptions
 */
const getIssueTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    const type = await issueTypeService.getIssueTypeById(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue type details fetched successfully!";
    apiResponse.data = type;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  uploadIssueTypes,
  getAllIssueTypes,
  downloadIssueTypesExcel,
  downloadIssueTypesCsv,
  addIssueType,
  updateIssueType,
  deleteIssueType,
  getIssueTypeById,
};
