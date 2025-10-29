import { IUser } from "../models/users/users.model";
import profileRepository from "../repositories/profile.repository";
import {
  validateNotFound,
  validateRequiredField,
  validateUserAuthorization,
} from "../utils/validators";

/**
 * ✅ Get a user profile by userId
 * @param {string} userId - Unique identifier of the user
 * @returns {Promise<IUser | null>} - Returns user record or null
 */
const getUserProfile = async (userId: string): Promise<IUser | null> => {
  validateUserAuthorization(userId);

  const userProfile = await profileRepository.getById(userId);
  validateNotFound(userProfile, "userProfile");

  return userProfile;
};

/**
 * ✅ Update a user profile
 * @param {string} userId - Unique identifier of the user
 * @param {Partial<IUser>} updateData - Fields to update
 * @returns {Promise<IUser | null>} - Returns updated user record or null
 */
const updateProfile = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  validateUserAuthorization(userId);

  const existingUser = await profileRepository.getById(userId);
  validateNotFound(existingUser, "existingUser");

  // Check if email already exists for another user
  if (updateData.email) {
    const existingEmail = await profileRepository.findEmailAlreadyExists(
      updateData.email,
      userId
    );
    if (existingEmail) throw new Error("Email already exists for another user.");
  }

  const updatedProfile = await profileRepository.update(userId, updateData);
  validateNotFound(updatedProfile, "updatedProfile");

  return updatedProfile;
};

/**
 * ✅ Get all user profiles with simple pagination
 * @param {number} pageNumber - Page number
 * @param {number} pageSize - Page size
 * @returns {Promise<{ users: IUser[]; hasNext: boolean; totalCount: number }>}
 */
const getAllUsers = async (
  pageNumber: number,
  pageSize: number
): Promise<{ users: IUser[]; hasNext: boolean; totalCount: number }> => {
  const { users, totalCount, hasNext } = await profileRepository.getAllUsers(pageNumber, pageSize);
  return { users, hasNext, totalCount };
};

/**
 * ✅ Get detailed user profile (Admin)
 * @param {string} adminId - Admin ID performing the action
 * @param {string} userId - User ID to fetch details
 * @returns {Promise<IUser | null>} - Returns user record or null
 */
const getProfileDetails = async (
  adminId: string,
  userId: string
): Promise<IUser | null> => {
  validateUserAuthorization(adminId);
  validateRequiredField(userId, "userId");

  const userProfile = await profileRepository.getById(userId);
  validateNotFound(userProfile, "userProfile");

  return userProfile;
};

export default {
  getUserProfile,
  updateProfile,
  getAllUsers,
  getProfileDetails,
};
