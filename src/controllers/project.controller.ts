import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/api-response';
import { projectService } from '../services';
import { IProject } from '../models/projects/projects.model';
import { AuthRequest } from '../middlewares/auth/verify-auth';

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

/**
 * ✅ Create New Project
 * @route POST /api/v1/projects/create
 * @access Admin only
 * @param {Request} req - Express request object containing project data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Creates a new project record in the database.
 */
const createProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projectData = req.body as IProject;
    const createdBy = req.user?.id || null;

    const project = await projectService.createProject(createdBy!, projectData);

    const response = new ApiResponse<{ project: IProject }>();
    response.statusCode = 201;
    response.message = '✅ Project created successfully!';
    response.data = { project };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update Project
 * @route PUT /api/v1/projects/update/:id
 * @access Admin only
 * @param {Request} req - Express request object containing updated data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Updates an existing project by its ID.
 */
const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const updatedProject = await projectService.updateProject(userId, id, req.body);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Project updated successfully!';
    apiResponse.data = updatedProject;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete Project
 * @route DELETE /api/v1/projects/delete/:id
 * @access Admin only
 * @param {Request} req - Express request object containing project ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Deletes a project record from the database.
 */
const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    await projectService.deleteProject(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '🗑️ Project deleted successfully!';
    apiResponse.data = { id };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Assign Team to Project
 * @route POST /api/v1/projects/assign-team/:projectId
 * @access Admin only
 * @param {Request} req - Express request object containing projectId & teamId
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Assigns a specific team to a project.
 */
const assignTeamToProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { projectId } = req.params;
    const { teamId } = req.body;
    const result = await projectService.assignTeamToProject(userId, projectId, teamId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Team assigned to project successfully!';
    apiResponse.data = result;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Projects Assigned to Inspector
 * @route GET /api/v1/projects/inspector/projects
 * @access Inspector Team
 * @param {Request} req - Express request object with inspector userId
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Retrieves projects assigned to a specific inspector.
 */
const getProjectsByInspector = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const data = await projectService.getProjectsByInspector(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Inspector projects fetched successfully!';
    apiResponse.data = data;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Projects Assigned to Contractor
 * @route GET /api/v1/projects/contractor/projects
 * @access Contractor Team
 * @param {Request} req - Express request object with contractor userId
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Retrieves all projects assigned to a specific contractor team.
 */
const getProjectsByContractor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const data = await projectService.getProjectsByContractor(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Contractor projects fetched successfully!';
    apiResponse.data = data;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Projects Assigned to Sub-Contractor
 * @route GET /api/v1/projects/sub-contractor/projects
 * @access Sub-Contractor Team
 * @param {Request} req - Express request object with sub-contractor userId
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Retrieves all projects assigned to a sub-contractor team.
 */
const getProjectsBySubContractor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const data = await projectService.getProjectsBySubContractor(userId);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Sub-contractor projects fetched successfully!';
    apiResponse.data = data;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  assignTeamToProject,
  getProjectsByInspector,
  getProjectsByContractor,
  getProjectsBySubContractor,
};
