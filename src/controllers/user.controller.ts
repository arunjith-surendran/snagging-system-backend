import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { IUser } from "../models/users/users.model";
import { userService } from "../services";
import { AuthRequest } from "../middlewares/auth/verify-auth";

/**
 * ✅ Upload Users (CSV/Excel)
 * @route POST /api/v1/users/upload
 * @access Admin
 * @param {Request} req - Express request containing uploaded file (CSV or Excel)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Uploads and processes a CSV/Excel file containing user data.
 *              Returns count of successfully inserted records.
 */
const uploadUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const result = await userService.importUsers(req.file.path);
    const apiResponse = new ApiResponse();
    apiResponse.message = `✅ File processed successfully! ${result.insertedCount} user(s) added.`;
    apiResponse.statusCode = 200;
    apiResponse.data = { insertedCount: result.insertedCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get All Users (Paginated)
 * @route GET /api/v1/users
 * @access Admin
 * @param {Request} req - Express request with optional query params (pageNumber, pageSize)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches paginated list of all users from the system.
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pageNumber = parseInt((req.query.pageNumber as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);

    const { users, hasNext, totalCount } = await userService.getAllUsers(pageNumber, pageSize);

    const apiResponse: ApiResponse<{ users: IUser[]; hasNext: boolean; totalCount: number }> =
      new ApiResponse();
    apiResponse.message = "✅ Users fetched successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = { users, hasNext, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Create a new User
 * @route POST /api/v1/users
 * @access Admin
 * @param {Request} req - Express request with new user data in body
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Creates a new user record in the database with the authenticated admin as creator.
 */
const createUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData = req.body as IUser;
    const createdBy = req.user?.id || null; 

    console.log("🧩 req.user inside controller:", req.user);
    const user = await userService.createUser(userData, createdBy);

    const apiResponse: ApiResponse<{ user: IUser }> = new ApiResponse();
    apiResponse.message = "✅ User created successfully!";
    apiResponse.statusCode = 201;
    apiResponse.data = { user };

    res.status(201).json(apiResponse);
  } catch (error) {
    next(error);
  }
};
/**
 * ✅ Download All Users (Excel)
 * @route GET /api/v1/users/download/excel
 * @access Admin
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Exports all users as an Excel (.xlsx) file.
 */
const downloadUsersExcel = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName } = await userService.downloadUsers("excel", res);

    res.json({
      status: true,
      message: "✅ Users exported successfully as Excel.",
      fileName,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Download All Users (CSV)
 * @route GET /api/v1/users/download/csv
 * @access Admin
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Exports all users as a CSV file.
 */
const downloadUsersCsv = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName } = await userService.downloadUsers("csv", res);

    res.json({
      status: true,
      message: "✅ Users exported successfully as CSV.",
      fileName,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * ✅ Get Logged-In User Profile Details
 * @route GET /api/v1/users/get-profile-details
 * @access Authenticated User
 * @param {Request} req - Express request object (expects `req.user` or token)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches the currently logged-in user's profile details based on their access token.
 */
const getProfileDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const user = await userService.getProfileDetails(userId);
    const apiResponse: ApiResponse<{ user: IUser }> = new ApiResponse();
    apiResponse.message = "✅ Profile details fetched successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = { user };
    res.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  uploadUsers,
  getAllUsers,
  createUser,
  downloadUsersExcel,
  downloadUsersCsv,
  getProfileDetails
};
