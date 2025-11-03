import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/api-response';
import { teamService } from '../services';
import { AuthRequest } from '../middlewares/auth/verify-auth';

/**
 * ✅ Upload Team Data (CSV / Excel)
 * @route POST /api/v1/teams/upload
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Parses uploaded CSV/Excel file and inserts valid team records into the database.
 */
const uploadTeams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    const result = await teamService.importTeams(req.file.path, userId);
    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = `✅ File processed successfully! ${result.insertedCount} team(s) added.`;
    apiResponse.data = { insertedCount: result.insertedCount };
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get All Teams
 * @route GET /api/v1/teams/get-all-teams
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Returns paginated list of all team records from the database.
 */
const getAllTeams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const pageNumber = parseInt((req.query.pageNumber as string) || '1', 10);
    const pageSize = parseInt((req.query.pageSize as string) || '10', 10);
    const { teams, hasNext, totalCount } = await teamService.getAllTeams(userId, pageNumber, pageSize);
    const apiResponse: ApiResponse<{
      teams: any[];
      hasNext: boolean;
      totalCount: number;
    }> = new ApiResponse();
    apiResponse.message = '✅ Teams fetched successfully!';
    apiResponse.statusCode = 200;
    apiResponse.data = { teams, hasNext, totalCount };
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Download All Teams (Excel)
 * @route GET /api/v1/teams/download/excel
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Generates an Excel file of all teams and streams it directly to the client.
 */
const downloadTeamsExcel = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { fileName } = await teamService.downloadTeams('excel', res, userId);
    const apiResponse: ApiResponse<{ fileName: string }> = new ApiResponse();
    apiResponse.message = '✅ Teams exported successfully as Excel.';
    apiResponse.statusCode = 200;
    apiResponse.data = { fileName };
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Download All Teams (CSV)
 * @route GET /api/v1/teams/download/csv
 * @param {AuthRequest} req - Express request object containing authenticated user
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Generates a CSV file of all teams and streams it directly to the client.
 */
const downloadTeamsCsv = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id; 
    const { fileName } = await teamService.downloadTeams('csv', res, userId);
    const apiResponse: ApiResponse<{ fileName: string }> = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Teams exported successfully as CSV.';
    apiResponse.data = { fileName };
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Add a New Team (Admin)
 * @route POST /api/v1/teams/admin/add
 * @param {Request} req - Express request object containing new team details
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Allows admin to create a new team in the system.
 */
const addTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const teamData = req.body;
    const createdTeam = await teamService.addTeam(userId, teamData);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 201;
    apiResponse.message = '✅ Team created successfully!';
    apiResponse.data = createdTeam;

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update Team by ID (Admin)
 * @route PUT /api/v1/teams/admin/update/:id
 * @param {Request} req - Express request object containing updated data and team ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Updates existing team details based on the provided ID.
 */
const updateTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTeam = await teamService.updateTeam(userId, id, updatedData);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Team updated successfully!';
    apiResponse.data = updatedTeam;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete Team by ID (Admin)
 * @route DELETE /api/v1/teams/admin/delete/:id
 * @param {Request} req - Express request object containing team ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Deletes a specific team record from the database.
 */
const deleteTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    await teamService.deleteTeam(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '🗑️ Team deleted successfully!';
    apiResponse.data = { id };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get Team by ID (Admin)
 * @route GET /api/v1/teams/admin/get/:id
 * @param {Request} req - Express request object containing team ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Retrieves detailed information for a specific team by ID.
 */
const getTeamById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;
    const team = await teamService.getTeamById(userId, id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ Team details fetched successfully!';
    apiResponse.data = team;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  uploadTeams,
  getAllTeams,
  downloadTeamsExcel,
  downloadTeamsCsv,
  addTeam,
  updateTeam,
  deleteTeam,
  getTeamById,
};
