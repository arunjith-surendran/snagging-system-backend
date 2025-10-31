import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { buildingService } from "../services";
import { IBuilding } from "../models/buildings/buildings.model";

/**
 * ✅ Get all buildings by project ID
 * @route GET /api/v1/buildings/:projectId
 * @access Admin
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all buildings for a specific project ID.
 */
const getBuildingsByProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { projectId } = req.params;

    const buildings: IBuilding[] = await buildingService.getBuildingsByProjectId(projectId);

    const apiResponse: ApiResponse<{ buildings: IBuilding[] }> = new ApiResponse<{ buildings: IBuilding[] }>();
    apiResponse.message = "Buildings fetched successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = { buildings };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getBuildingsByProjectId,
};
