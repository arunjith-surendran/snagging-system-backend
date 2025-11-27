import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/api-response';
import adminService from '../services/admin.service';
import { IAdmin } from '../models/admin/admin.model';


/**
 * ✅ Create Admin
 * @route POST /api/v1/admin/create
 * @description Creates a new admin record in the system
 * @access Public (restricted in production)
 * @param {Request} req - Express request with admin data
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next middleware
 */
const addAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { adminUserName, adminUserType, email, password } = req.body;

    const admin: IAdmin = await adminService.createAdmin(adminUserName, adminUserType, email, password);

    const apiResponse: ApiResponse<{ admin: IAdmin }> = new ApiResponse();
    apiResponse.message = '✅ Admin created successfully!';
    apiResponse.statusCode = 201;
    apiResponse.data = { admin };

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};



export default { addAdmin };
