import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import ApiResponse from "../utils/api-response";

/**
 * ✅ Login (User/Admin)
 * @route POST /api/v1/auth/login
 * @description Authenticates a user or admin using email and password, and returns JWT tokens.
 * @param {Request} req - Express request (expects `email`, `password` in body)
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next middleware
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { account, tokens } = await authService.login(email, password);

    const apiResponse = new ApiResponse();
    apiResponse.message = "✅ Login successful!";
    apiResponse.statusCode = 200;
    apiResponse.data = { account, tokens };

    res.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * ♻️ Refresh Access Token
 * @route POST /api/v1/auth/refresh-token
 * @description Generates a new access token using the refresh token from the Authorization header.
 * @param {Request} req - Express request (expects `Authorization: Bearer <refreshToken>`)
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next middleware
 */
const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader?.split(" ")[1];

    if (!refreshToken) {
      const apiResponse = new ApiResponse();
      apiResponse.statusCode = 400;
      apiResponse.message = "❌ Missing refresh token in Authorization header";
      res.status(400).json(apiResponse);
      return;
    }

    const tokens = await authService.refreshAccessToken(refreshToken);

    const apiResponse = new ApiResponse();
    apiResponse.message = "✅ Access token refreshed successfully!";
    apiResponse.statusCode = 200;
    apiResponse.data = tokens;

    res.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * 🚪 Logout
 * @route POST /api/v1/auth/logout
 * @description Logs out a user or admin by invalidating the provided refresh token.
 * @param {Request} req - Express request (expects `Authorization: Bearer <refreshToken>`)
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next middleware
 */
const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader?.split(" ")[1];

    if (!refreshToken) {
      const apiResponse = new ApiResponse();
      apiResponse.statusCode = 400;
      apiResponse.message = "❌ Missing refresh token in Authorization header";
      res.status(400).json(apiResponse);
      return;
    }

    await authService.logout(refreshToken);

    const apiResponse = new ApiResponse();
    apiResponse.message = "✅ Logged out successfully!";
    apiResponse.statusCode = 200;

    res.status(200).json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default { login, refreshToken, logout };
