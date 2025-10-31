import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { projectService } from "../services";
import { IProject } from "../models/projects/projects.model";

/**
 * ✅ Get all projects (Admin only)
 * @route GET /api/v1/projects
 * @access Admin
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @description Fetches all projects from the database with simple pagination.
 */
const getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 🔢 Parse pagination params
    const pageNumber = parseInt((req.query.pageNumber as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);

    // ⚙️ Fetch paginated projects
    const { projects, hasNext, totalCount } = await projectService.getAllProjects(pageNumber, pageSize);

    // 🧾 Format API response
    const apiResponse: ApiResponse<{
      projects: IProject[];
      hasNext: boolean;
      totalCount: number;
    }> = new ApiResponse();

    apiResponse.message = "Projects fetched successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = { projects, hasNext, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllProjects,
};
