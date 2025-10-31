import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/api-response";
import { IUser } from "../models/users/users.model";
import { userService } from "../services";

/**
 * ✅ Upload Users (CSV/Excel)
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
 * ✅ Create a new user
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body as IUser;
    const user = await userService.createUser(userData);

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

export default {
  uploadUsers,
  getAllUsers,
  createUser,
  downloadUsersExcel,
  downloadUsersCsv,
};
