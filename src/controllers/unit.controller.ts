import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { unitService } from "../services";
import { IUnit } from "../models/units/units.model";

/**
 * ✅ Get all units by building ID
 * @route GET /api/v1/units/:buildingId
 * @access Admin
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all units linked to a specific building ID.
 */
const getUnitsByBuildingId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { buildingId } = req.params;

    const units: IUnit[] = await unitService.getUnitsByBuildingId(buildingId);

    const apiResponse: ApiResponse<{ units: IUnit[] }> = new ApiResponse<{ units: IUnit[] }>();
    apiResponse.message = "Units fetched successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = { units };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getUnitsByBuildingId,
};
