import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/api-response';
import { projectService } from '../services';
import { IProject } from '../models/projects/projects.model';
// import { AuthRequest } from '../middlewares/auth/verify-auth';

/**
 * ✅ Get All Projects
 * @route GET /api/v1/projects/get-all
 * @access Admin / Inspector / QA Verify
 * @param {Request} req - Express request object (supports pagination)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all projects with pagination support.
 */
const getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const pageNumber = parseInt((req.query.pageNumber as string) || '1', 10);
    const pageSize = parseInt((req.query.pageSize as string) || '10', 10);

    const { projects, hasNext, totalCount } = await projectService.getAllProjects(userId, pageNumber, pageSize);

    const apiResponse: ApiResponse<{ projects: IProject[]; hasNext: boolean; totalCount: number }> = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Projects fetched successfully!';
    apiResponse.data = { projects, hasNext, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Project by ID
 * @route GET /api/v1/projects/get/:id
 * @access Admin / Inspector / QA Verify
 * @param {Request} req - Express request object containing project ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Retrieves project details by ID.
 */
const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const project = await projectService.getProjectById(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Project fetched successfully!';
    apiResponse.data = project;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};



export default {
  getAllProjects,
  getProjectById,

};
