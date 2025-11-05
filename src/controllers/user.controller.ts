import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/api-response';
import { IUser } from '../models/users/users.model';
import { userService } from '../services';
import { AuthRequest } from '../middlewares/auth/verify-auth';
import { UserRole } from '../types/user';

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
      res.status(400).json({ message: 'No file uploaded' });
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
    const pageNumber = parseInt((req.query.pageNumber as string) || '1', 10);
    const pageSize = parseInt((req.query.pageSize as string) || '10', 10);

    const { users, hasNext, totalCount } = await userService.getAllUsers(pageNumber, pageSize);

    const apiResponse: ApiResponse<{ users: IUser[]; hasNext: boolean; totalCount: number }> = new ApiResponse();
    apiResponse.message = '✅ Users fetched successfully!';
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

    console.log('🧩 req.user inside controller:', req.user);
    const user = await userService.createUser(userData, createdBy);

    const apiResponse: ApiResponse<{ user: IUser }> = new ApiResponse();
    apiResponse.message = '✅ User created successfully!';
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
    const { fileName } = await userService.downloadUsers('excel', res);

    res.json({
      status: true,
      message: '✅ Users exported successfully as Excel.',
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
    const { fileName } = await userService.downloadUsers('csv', res);

    res.json({
      status: true,
      message: '✅ Users exported successfully as CSV.',
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
    apiResponse.message = '✅ Profile details fetched successfully!';
    apiResponse.statusCode = 200;
    apiResponse.data = { user };
    res.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update User’s Team (Admin)
 * @route PUT /api/v1/users/admin/update-user-team/:userId
 * @param {string} userId - ID of the user
 * @param {string} teamId - New team ID
 */
const updateUserTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminId = (req as any).user?.id;
    const { userId } = req.params;
    const { teamId } = req.body;
    const updatedUser = await userService.updateUserTeam(adminId, userId, teamId);
    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ User team updated successfully!';
    apiResponse.data = updatedUser;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Get All Available User Roles
 * @route GET /api/v1/users/admin/get-user-roles
 * @access Admin Only
 * @param {Request} req - Express request object (expects authenticated admin user)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Fetches all user roles available in the system, excluding the system-reserved
 */
const getUserRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roles = Object.values(UserRole);
    const filteredRoles = roles.filter((role) => role !== UserRole.SUPER_ADMIN_ADMIN);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ User roles fetched successfully!';
    apiResponse.data = { roles: filteredRoles };
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update User by ID (Admin Only)
 * @route PUT /api/v1/users/admin/update/:id
 * @access Admin Only
 * @param {Request} req - Express request object (expects user ID in params and updated fields in body)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Allows an admin to update an existing user's details such as name, role, team, or admin flags.
 */
const updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await userService.updateUserById(id, updatedData);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '✅ User updated successfully!';
    apiResponse.data = { user: updatedUser };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Delete User by ID (Admin Only)
 * @route DELETE /api/v1/users/admin/delete/:id
 * @access Admin Only
 * @param {Request} req - Express request object (expects user ID in params)
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware
 * @description Permanently deletes a user record from the system by its ID. Only accessible to Admin users.
 */
const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    await userService.deleteUser(id);

    const apiResponse = new ApiResponse();
    apiResponse.statusCode = 200;
    apiResponse.message = '🗑️ User deleted successfully!';
    apiResponse.data = { deletedUserId: id };

    res.json(apiResponse);
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
  getProfileDetails,
  updateUserTeam,
  getUserRoles,
  updateUserById,
  deleteUser
};
