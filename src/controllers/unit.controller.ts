import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { unitService } from "../services";
import { IUnit } from "../models/units/units.model";



/**
 * ✅ Get all units by project ID
 * @route GET /api/v1/units/:buildingId
 * @access Admin
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all units linked to a specific building ID.
 */

const getAllUnits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      const { units, totalCount } = await unitService.getAllUnits(userId);
  
      const apiResponse = new ApiResponse();
      apiResponse.statusCode = 200;
      apiResponse.message = "✅ Units fetched successfully!";
      apiResponse.data = { units, totalCount };
  
      res.json(apiResponse);
    } catch (error) {
      next(error);
    }

}
const getUnitsByProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    console.log(userId, "hello");
    
    const projectId  = req.params?.id;

    console.log(projectId, "jadoooo");
    

    const units: IUnit[] = await unitService.getUnitsByProjectId(projectId);

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
  getAllUnits,
  getUnitsByProjectId,
};
