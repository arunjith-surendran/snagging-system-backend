import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { issueService } from "../services";

/**
 * ✅ Get All Issues
 * @route GET /api/v1/issues/get-all
 * @access Admin / Inspector / QA Verify
 * @param {Request} req - Express request object (supports pagination)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all issues with pagination.
 */
const getAllIssues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { issues, totalCount } = await issueService.getAllIssues(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issues fetched successfully!";
    apiResponse.data = { issues, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Issue by ID
 * @route GET /api/v1/issues/get/:id
 * @access Admin / Inspector / QA Verify
 * @param {Request} req - Express request object containing issue ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Retrieves a specific issue by its ID.
 */
const getIssueById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const issue = await issueService.getIssueById(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue fetched successfully!";
    apiResponse.data = issue;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Create New Issue
 * @route POST /api/v1/issues/create
 * @access Admin / Inspector
 * @param {Request} req - Express request object containing issue data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Creates a new issue record.
 */
const createIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const createdIssue = await issueService.createIssue(userId, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 201;
    apiResponse.message = "✅ Issue created successfully!";
    apiResponse.data = createdIssue;

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update Issue
 * @route PUT /api/v1/issues/update/:id
 * @access Admin / Contractor / Sub-Contractor
 * @param {Request} req - Express request object containing updated issue data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Updates an existing issue by ID.
 */
const updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const updatedIssue = await issueService.updateIssue(userId, id, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue updated successfully!";
    apiResponse.data = updatedIssue;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete Issue
 * @route DELETE /api/v1/issues/delete/:id
 * @access Admin only
 * @param {Request} req - Express request object containing issue ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Deletes an issue record from the system.
 */
const deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    await issueService.deleteIssue(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "🗑️ Issue deleted successfully!";
    apiResponse.data = { id };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Inspector Team - Get Assigned or Created Issues
 * @route GET /api/v1/issues/inspector/issues
 * @access Inspector Team
 * @param {Request} req - Express request object with inspector userId
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Retrieves all issues created or assigned to the inspector.
 */
const getIssuesByInspector = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const data = await issueService.getIssuesByInspector(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Inspector issues fetched successfully!";
    apiResponse.data = data;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Inspector Team - Create Issue for Project
 * @route POST /api/v1/issues/inspector/create/:projectId
 * @access Inspector Team
 * @param {Request} req - Express request object containing projectId and issue data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Allows inspectors to create issues under a specific project.
 */
const createIssueByInspector = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { projectId } = req.params;
    const createdIssue = await issueService.createIssueByInspector(userId, projectId, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 201;
    apiResponse.message = "✅ Issue created by inspector successfully!";
    apiResponse.data = createdIssue;

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Contractor Team - Get Assigned Issues
 * @route GET /api/v1/issues/contractor/issues
 * @access Contractor Team
 * @param {Request} req - Express request object containing contractor ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all issues assigned to the contractor team.
 */
const getIssuesByContractor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const data = await issueService.getIssuesByContractor(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Contractor issues fetched successfully!";
    apiResponse.data = data;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Contractor Team - Update Issue Status
 * @route PUT /api/v1/issues/contractor/update-status/:issueId
 * @access Contractor Team
 * @param {Request} req - Express request object containing issueId and status data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Allows contractors to update assigned issue statuses (Open → Fixed/In Progress).
 */
const updateIssueStatusByContractor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { issueId } = req.params;
    const updatedIssue = await issueService.updateIssueStatusByContractor(userId, issueId, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue status updated by contractor successfully!";
    apiResponse.data = updatedIssue;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Sub-Contractor Team - Get Assigned Issues
 * @route GET /api/v1/issues/sub-contractor/issues
 * @access Sub-Contractor Team
 * @param {Request} req - Express request object containing sub-contractor ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches issues assigned to the sub-contractor team.
 */
const getIssuesBySubContractor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const data = await issueService.getIssuesBySubContractor(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Sub-contractor issues fetched successfully!";
    apiResponse.data = data;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Sub-Contractor Team - Update Issue Status
 * @route PUT /api/v1/issues/sub-contractor/update-status/:issueId
 * @access Sub-Contractor Team
 * @param {Request} req - Express request object containing issueId and status data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Allows sub-contractors to update assigned issue statuses (Open → Fixed).
 */
const updateIssueStatusBySubContractor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { issueId } = req.params;
    const updatedIssue = await issueService.updateIssueStatusBySubContractor(userId, issueId, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue status updated by sub-contractor successfully!";
    apiResponse.data = updatedIssue;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ QA Verify Team - Get Issues for Verification
 * @route GET /api/v1/issues/verify/issues
 * @access QA Verify Team
 * @param {Request} req - Express request object with QA userId
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all issues assigned to the QA/Verification team for review.
 */
const getIssuesForVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const data = await issueService.getIssuesForVerification(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issues for verification fetched successfully!";
    apiResponse.data = data;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ QA Verify Team - Verify or Reopen Issue
 * @route PUT /api/v1/issues/verify/update-status/:issueId
 * @access QA Verify Team
 * @param {Request} req - Express request object with issueId and action payload
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Allows QA/Verification team to mark issues as Closed or Reopen.
 */
const verifyOrReopenIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { issueId } = req.params;
    const result = await issueService.verifyOrReopenIssue(userId, issueId, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = "✅ Issue verification updated successfully!";
    apiResponse.data = result;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
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
