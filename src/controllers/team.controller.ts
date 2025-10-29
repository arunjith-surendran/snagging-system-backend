import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { teamService } from "../services";

/**
 * ✅ Upload Team Data (CSV / Excel)
 * @route POST /teams/upload
 * @access Admin
 * @description Parses uploaded CSV/Excel file and inserts valid team records into database.
 * @param {Request} req - Express request object containing uploaded file (via multer)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const uploadTeams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    console.log("📥 req.file =", req.file);
console.log("📦 req.body =", req.body);

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
 * @route GET /teams/get-all-teams
 * @access Admin
 * @description Returns paginated list of all team records from the database.
 * @param {Request} req - Express request object with query params pageNumber & pageSize
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
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

export default {
  uploadTeams,
  getAllTeams,
};
