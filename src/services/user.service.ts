import fs from "fs-extra";
import path from "path";
import ExcelJS from "exceljs";
import { Response } from "express";
import userRepository from "../repositories/user.repository";
import { IUser } from "../models/users/users.model";
import UserEntity from "../entities/user.entity";
import { validateBadRequest, validateDocumentExists, validateRequiredField } from "../utils/validators";
import { safeDeleteFile } from "../middlewares/upload/file-utils";

/**
 * ✅ Get all users (Paginated)
 * @param {number} pageNumber
 * @param {number} pageSize
 * @returns {Promise<{ users: IUser[]; hasNext: boolean; totalCount: number }>}
 */
const getAllUsers = async (pageNumber: number, pageSize: number): Promise<{ users: IUser[]; hasNext: boolean; totalCount: number }> => {
  const { users, hasNext, totalCount } = await userRepository.getAllUsers(pageNumber, pageSize);
  return { users, hasNext, totalCount };
};

/**
 * ✅ Create a new user (with validation + entity + duplicate email check)
 * @param {IUser} userData
 * @returns {Promise<IUser>}
 */
const createUser = async (userData: IUser): Promise<IUser> => {
  // 🧩 1️⃣ Validate required fields
  validateRequiredField(userData.fullName, 'Full Name');
  validateRequiredField(userData.email, 'Email');
  validateRequiredField(userData.userRole, 'User Role');

  // 🧩 2️⃣ Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  validateBadRequest(!emailRegex.test(userData.email), 'Invalid email format');

  // 🧩 3️⃣ Check if email already exists
  const emailTaken = await userRepository.isEmailTaken(userData.email);
  validateDocumentExists(emailTaken, 'Email');

  // 🧩 5️⃣ Create entity instance
  const userEntity: UserEntity = new UserEntity(
    userData.documentStatus ?? 'active',
    userData.fullName.trim(),
    userData.email.toLowerCase(),
    userData.userRole ?? null,
    userData.teamId ?? null,
    userData.isProjectAdmin ?? false,
    userData.isTeamAdmin ?? false,
    userData.createdUser ?? null,
    new Date(),
    userData.updatedUser ?? null,
    new Date(),
  );

  // 🧩 6️⃣ Save user to DB
  const newUser = await userRepository.createUser(userEntity as any);

  return newUser;
};

/**
 * ✅ Import Users from File (Excel/CSV)
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
        return new UserEntity(
          'active',
          String(row[2] || '').trim(),
          String(row[3] || '').trim(),
          String(row[4] || '').trim(),
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

    if (!entities.length) throw new Error('No valid user records found.');

    const insertedCount = await userRepository.bulkInsert(entities);
    safeDeleteFile(filePath);

    return { insertedCount };
  } catch (error) {
    safeDeleteFile(filePath);
    throw error;
  }
};

/**
 * ✅ Download Users (Excel/CSV)
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

  allUsers.forEach((user: any) => {
    sheet.addRow([
      user.id,
      user.documentStatus,
      user.fullName,
      user.email,
      user.userRole,
      user.teamId,
      user.isProjectAdmin,
      user.isTeamAdmin,
      user.createdUser,
      user.createdAt,
      user.updatedUser,
      user.updatedAt,
    ]);
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `users_${timestamp}.${format === 'csv' ? 'csv' : 'xlsx'}`;

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    await workbook.csv.write(res);
  } else {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    await workbook.xlsx.write(res);
  }

  res.end();
  return { fileName };
};

export default {
  importUsers,
  getAllUsers,
  createUser,
  downloadUsers,
};
