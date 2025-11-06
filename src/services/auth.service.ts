import bcrypt from "bcryptjs";
import * as argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import authRepository from "../repositories/auth.repository";
import { validateBadRequest, validateRequiredField } from "../utils/validators";
import { UserRole } from "../types/user";
import { IUser } from "../models/users/users.model";
import { IAdmin } from "../models/admin/admin.model";

/**
 * Login (User/Admin)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ account: any; tokens: { accessToken: string; refreshToken: string } }>}
 */
const login = async (email: string, password: string) => {
  validateRequiredField(email, "Email");
  validateRequiredField(password, "Password");

  const account = await authRepository.findAccountByEmail(email);
  validateBadRequest(!account, "Invalid email or password");

  let isValidPassword = false;
  let role: UserRole;
  let fullName: string;

  if ("userRole" in account) {
    // 🧑‍💼 Normal user
    const user = account as IUser;
    fullName = user.fullName;
    role = user.userRole;
    isValidPassword = await bcrypt.compare(password, user.password);
  } else {
    // 👑 Admin
    const admin = account as IAdmin;
    fullName = admin.adminUserName;
    // 👇 Ensure enum-safe fallback
    role =
      (admin.adminUserType as UserRole) ||
      UserRole.SUPER_ADMIN_ADMIN;
    isValidPassword = await argon2.verify(admin.password, password);
  }

  validateBadRequest(!isValidPassword, "Invalid email or password");

  // ✅ Payload with role included
  const payload = { id: account.id, email: account.email, userRole: role };

  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: `${config.jwt.accessExpirationMinutes}m`,
  });

  const refreshToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: `${config.jwt.refreshExpirationDays}d`,
  });

  return {
    account: { id: account.id, fullName, email: account.email, userRole: role },
    tokens: { accessToken, refreshToken },
  };
};
/**
 * Refresh Access Token
 * @param {string} refreshToken
 * @returns {Promise<{ accessToken: string }>}
 */
const refreshAccessToken = async (refreshToken: string) => {
  validateRequiredField(refreshToken, "Refresh token");

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.secret) as JwtPayload;
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, userRole: decoded.userRole },
      config.jwt.secret,
      { expiresIn: `${config.jwt.accessExpirationMinutes}m` }
    );
    return { accessToken: newAccessToken };
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<{ message: string }>}
 */
const logout = async (refreshToken: string) => {
  validateRequiredField(refreshToken, "Refresh token");
  return { message: "✅ Logged out successfully" };
};

export default { login, refreshAccessToken, logout };
