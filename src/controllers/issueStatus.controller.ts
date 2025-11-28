import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/api-response';
import { issueStatusService } from '../services';
import { AuthRequest } from '../middlewares/auth/verify-auth';

/**
 * ✅ Upload Issue Statuses (CSV / Excel)
 * @route POST /api/v1/issue-status/upload
 * @param {Request} req - Express request object containing uploaded file
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Parses uploaded CSV/Excel file and inserts valid issue-status records into the database.
 */
const uploadIssueStatuses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const result = await issueStatusService.importIssueStatuses(req.file.path, userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = `✅ File processed successfully! ${result.insertedCount} status(es) added.`;
    apiResponse.data = { insertedCount: result.insertedCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get All Issue Statuses (Paginated)
 * @route GET /api/v1/issue-status/get-all-statuses
 * @param {Request} req - Express request object with pagination params
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Returns a paginated list of issue status entries.
 */
const getAllIssueStatuses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    const pageNumber = parseInt((req.query.pageNumber as string) || '1', 10);
    const pageSize = parseInt((req.query.pageSize as string) || '10', 10);

    const { statuses, hasNext, totalCount } = await issueStatusService.getAllIssueStatuses(userId, pageNumber, pageSize);

    const apiResponse = new ApiResponse<{
      statuses: any[];
      hasNext: boolean;
      totalCount: number;
    }>();

    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Issue statuses fetched successfully!';
    apiResponse.data = { statuses, hasNext, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Download All Issue Statuses (Excel)
 * @route GET /api/v1/issue-status/download/excel
 * @param {AuthRequest} req - Authenticated request
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Generates an Excel file of all issue statuses.
 */
const downloadIssueStatusesExcel = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { fileName } = await issueStatusService.downloadIssueStatuses('excel', res, userId);

    const apiResponse = new ApiResponse<{ fileName: string }>();
    apiResponse.statusCode = 200;
    apiResponse.message = '📄 Issue statuses exported successfully as Excel.';
    apiResponse.data = { fileName };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Download All Issue Statuses (CSV)
 * @route GET /api/v1/issue-status/download/csv
 * @param {AuthRequest} req - Authenticated request
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Generates a CSV file of all issue statuses.
 */
const downloadIssueStatusesCsv = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { fileName } = await issueStatusService.downloadIssueStatuses('csv', res, userId);

    const apiResponse = new ApiResponse<{ fileName: string }>();
    apiResponse.statusCode = 200;
    apiResponse.message = '📄 Issue statuses exported successfully as CSV.';
    apiResponse.data = { fileName };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Add a New Issue Status (Admin)
 * @route POST /api/v1/issue-status/admin/add
 * @param {Request} req - Express request containing status data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Allows admin to create a new issue status.
 */
const addIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const statusData = req.body;

    const createdStatus = await issueStatusService.addIssueStatus(userId, statusData);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 201;
    apiResponse.message = '✅ Issue status created successfully!';
    apiResponse.data = createdStatus;

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update Issue Status by ID (Admin)
 * @route PUT /api/v1/issue-status/admin/update/:id
 * @param {Request} req - Express request object with updated values
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Updates an existing issue status by ID.
 */
const updateIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    const updatedStatus = await issueStatusService.updateIssueStatus(userId, id, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Issue status updated successfully!';
    apiResponse.data = updatedStatus;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete Issue Status by ID (Admin)
 * @route DELETE /api/v1/issue-status/admin/delete/:id
 * @param {Request} req - Express request containing status ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Deletes a specific issue status record.
 */
const deleteIssueStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    await issueStatusService.deleteIssueStatus(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '🗑️ Issue status deleted successfully!';
    apiResponse.data = { id };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Issue Status by ID (Admin)
 * @route GET /api/v1/issue-status/admin/get/:id
 * @param {Request} req - Express request containing status ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Retrieves detailed information for a specific issue status by ID.
 */
const getIssueStatusById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    const status = await issueStatusService.getIssueStatusById(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Issue status details fetched successfully!';
    apiResponse.data = status;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  uploadIssueStatuses,
  getAllIssueStatuses,
  downloadIssueStatusesExcel,
  downloadIssueStatusesCsv,
  addIssueStatus,
  updateIssueStatus,
  deleteIssueStatus,
  getIssueStatusById,
};
