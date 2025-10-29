import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/users/users.model';
import ApiResponse from '../utils/api-response';
import { profileService } from '../services';

/**
 * ✅ Get user profile
 * @route GET /profile/get-profile
 * @access User
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.body;

    const userProfile: IUser | null = await profileService.getUserProfile(userId);

    const apiResponse: ApiResponse<{ userProfile: IUser | null }> = new ApiResponse<{ userProfile: IUser | null }>();
    apiResponse.message = 'Profile retrieved successfully!';
    apiResponse.data = { userProfile };
    apiResponse.statusCode = 200;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ Update user profile
 * @route PUT /profile/update-profile
 * @access User
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, fullName, email, userRole, isProjectAdmin, isTeamAdmin } = req.body;

    const updateData: Partial<IUser> = {
      fullName,
      email,
      userRole,
      isProjectAdmin,
      isTeamAdmin,
    };

    const updatedProfile: IUser | null = await profileService.updateProfile(userId, updateData);

    const apiResponse: ApiResponse<{ updatedProfile: IUser | null }> = new ApiResponse<{ updatedProfile: IUser | null }>();
    apiResponse.message = 'Profile updated successfully!';
    apiResponse.data = { updatedProfile };
    apiResponse.statusCode = 200;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};


/**
 * ✅ Get all user profiles (Admin only)
 * @route GET /profile/get-all-profiles
 * @access Admin
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const getAllProfiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pageNumber = parseInt((req.query.pageNumber as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);

    const { users, hasNext, totalCount } = await profileService.getAllUsers(pageNumber, pageSize);

    const apiResponse: ApiResponse<{
      users: IUser[];
      hasNext: boolean;
      totalCount: number;
    }> = new ApiResponse();

    apiResponse.message = "Profiles fetched successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = { users, hasNext, totalCount };

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};


/**
 * ✅ Get a specific user profile (Admin only)
 * @route GET /profile/get-profile-details/:userId
 * @access Admin
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const getProfileDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { adminId } = req.body;
    const { userId } = req.params;

    const userProfile: IUser | null = await profileService.getProfileDetails(adminId, userId);

    const apiResponse: ApiResponse<{ userProfile: IUser | null }> = new ApiResponse<{ userProfile: IUser | null }>();
    apiResponse.message = 'Profile retrieved successfully!';
    apiResponse.data = { userProfile };
    apiResponse.statusCode = 200;

    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getProfile,
  updateProfile,
  getAllProfiles,
  getProfileDetails,
};
