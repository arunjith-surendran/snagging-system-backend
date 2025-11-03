import fs from 'fs-extra';
import path from 'path';
import ExcelJS from 'exceljs';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import userRepository from '../repositories/user.repository';
import { IUser } from '../models/users/users.model';
import UserEntity from '../entities/user.entity';
import { validateBadRequest, validateDocumentExists, validateRequiredField } from '../utils/validators';
import { safeDeleteFile } from '../middlewares/upload/file-utils';
import { UserRole } from '../types/user';

/**
 * ✅ Get All Users (Paginated)
 */
const getAllUsers = async (pageNumber: number, pageSize: number) => {
  return await userRepository.getAllUsers(pageNumber, pageSize);
};

/**
 * ✅ Create a new User
 * @param {IUser} userData - New user data
 * @param {string | null} createdBy - Authenticated admin ID
 * @returns {Promise<IUser>} Created user record
 */
const createUser = async (userData: IUser, createdBy: string | null): Promise<IUser> => {
  validateRequiredField(userData.fullName, 'Full Name');
  validateRequiredField(userData.email, 'Email');
  validateRequiredField(userData.password, 'Password');
  validateRequiredField(userData.userRole, 'User Role');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  validateBadRequest(!emailRegex.test(userData.email), 'Invalid email format');

  const emailTaken = await userRepository.isEmailTaken(userData.email);
  validateDocumentExists(emailTaken, 'Email');

  const validRoles = Object.values(UserRole);
  if (!validRoles.includes(userData.userRole)) {
    throw new Error(`Invalid user role: ${userData.userRole}`);
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const userEntity = new UserEntity(
    true,
    userData.fullName.trim(),
    userData.email.toLowerCase(),
    hashedPassword,
    userData.userRole,
    userData.teamId ?? null,
    userData.isProjectAdmin ?? false,
    userData.isTeamAdmin ?? false,
    createdBy, // 👈 set createdUser = admin id
    new Date(),
    userData.updatedUser ?? null,
    new Date(),
  );

  return await userRepository.createUser(userEntity);
};

/**
 * ✅ Import Users (CSV/Excel)
 */
const importUsers = async (filePath: string): Promise<{ insertedCount: number }> => {
  try {
    if (!fs.existsSync(filePath)) throw new Error('Uploaded file not found');
    const workbook = new ExcelJS.Workbook();
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.csv') await workbook.csv.readFile(filePath);
    else await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) throw new Error('Invalid or empty file uploaded');

    const rows = worksheet.getSheetValues().slice(2);
    if (!rows.length) throw new Error('File is empty or invalid format.');

    const entities: UserEntity[] = rows
      .map((row: any) => {
        if (!row || !row[2]) return null;

        const roleString = String(row[4] || '').trim();
        const roleEnum = (Object.values(UserRole).find((r) => r === roleString) as UserRole) || UserRole.CONTRACTOR_TEAM;

        const defaultPassword = bcrypt.hashSync('Password@123', 10);

        return new UserEntity(
          true,
          String(row[2] || '').trim(),
          String(row[3] || '').trim(),
          defaultPassword,
          roleEnum,
          null,
          false,
          false,
          'system-upload',
          new Date(),
          'system-upload',
          new Date(),
        );
      })
      .filter((u): u is UserEntity => !!u);

    const insertedCount = await userRepository.bulkInsert(entities);
    safeDeleteFile(filePath);
    return { insertedCount };
  } catch (error) {
    safeDeleteFile(filePath);
    throw error;
  }
};

/**
 * ✅ Download All Users (Excel/CSV)
 */
const downloadUsers = async (format: 'excel' | 'csv', res: Response) => {
  const allUsers = await userRepository.getAllUsersForExport();
  validateBadRequest(!allUsers.length, 'No users found to export.');

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Users');
  sheet.addRow([
    'ID',
    'Document Status',
    'Full Name',
    'Email',
    'User Role',
    'Team ID',
    'Is Project Admin',
    'Is Team Admin',
    'Created User',
    'Created At',
    'Updated User',
    'Updated At',
  ]);

  allUsers.forEach((u) =>
    sheet.addRow([
      u.id,
      u.documentStatus,
      u.fullName,
      u.email,
      u.userRole,
      u.teamId,
      u.isProjectAdmin,
      u.isTeamAdmin,
      u.createdUser,
      u.createdAt,
      u.updatedUser,
      u.updatedAt,
    ]),
  );

  const fileName = `users_${new Date().toISOString().replace(/[:.]/g, '-')}.${format === 'csv' ? 'csv' : 'xlsx'}`;
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    await workbook.csv.write(res);
  } else {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    await workbook.xlsx.write(res);
  }

  res.end();
  return { fileName };
};

/**
 * ✅ Get Profile Details
 * @function getProfileDetails
 * @description Fetches the profile details of a specific user by ID.
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<IUser>} - Returns the user details (excluding sensitive data).
 * @throws {Error} - Throws validation errors if userId is missing or user not found.
 */
const getProfileDetails = async (userId: string): Promise<IUser> => {
  validateRequiredField(userId, 'User ID');
  const user = await userRepository.findById(userId);
  validateBadRequest(!user, 'User not found!');
  const { password, ...safeUser } = user as any;
  return safeUser as IUser;
};

export default { getAllUsers, createUser, importUsers, downloadUsers, getProfileDetails };
