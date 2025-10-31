import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { teamService } from "../services";

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
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    const result = await teamService.importTeams(req.file.path);
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
    const pageNumber = parseInt((req.query.pageNumber as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);
    const { teams, hasNext, totalCount } = await teamService.getAllTeams(pageNumber, pageSize);
    const apiResponse: ApiResponse<{
      teams: any[];
      hasNext: boolean;
      totalCount: number;
    }> = new ApiResponse();
    apiResponse.message = "✅ Teams fetched successfully!";
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
const downloadTeamsExcel = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fileName } = await teamService.downloadTeams("excel", res);
    const apiResponse: ApiResponse<{ fileName: string }> = new ApiResponse();
    apiResponse.message = "✅ Teams exported successfully as Excel.";
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
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Generates a CSV file of all teams and streams it directly to the client.
 */
const downloadTeamsCsv = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fileName } = await teamService.downloadTeams("csv", res);
    const apiResponse: ApiResponse<{ fileName: string }> = new ApiResponse();
    apiResponse.message = "✅ Teams exported successfully as CSV.";
    apiResponse.statusCode = 200;
    apiResponse.data = { fileName };
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
};
