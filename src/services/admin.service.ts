// src/services/admin.service.ts
import * as argon2 from "argon2";
import AdminEntity from "../entities/admin.entity";
import adminRepository from "../repositories/admin.repository";
import ERROR from "../middlewares/web_server/http-error";
import { IAdmin } from "../models/admin/admin.model";
import { UserRole } from "../types/user";

/**
 * ✅ Create new Admin
 * @param {string} adminUserName - Admin display name
 * @param {UserRole} adminUserType - Role type (enum)
 * @param {string} email - Unique admin email
 * @param {string} password - Plain password
 * @returns {Promise<IAdmin>} Newly created admin record
 */
const createAdmin = async (
  adminUserName: string,
  adminUserType: UserRole,
  email: string,
  password: string
): Promise<IAdmin> => {
  if (await adminRepository.isEmailTaken(email)) {
    throw new ERROR.DocumentExistsError("Email already taken!");
  }

  const hashedPassword = await argon2.hash(password);

  // 🧱 Construct domain entity
  const adminEntity = new AdminEntity(
    true,
    adminUserName,
    UserRole.SUPER_ADMIN_ADMIN,
    email,
    hashedPassword,
    null,
    new Date(),
    null,
    new Date()
  );

  // 🔄 Convert enum to string for DB
  const insertData = {
    ...adminEntity,
    adminUserType: adminEntity.adminUserType.toString(), // ✅ conversion here
  };

  const newAdmin = await adminRepository.create(insertData);
  return newAdmin as IAdmin;
};

export default { createAdmin };
