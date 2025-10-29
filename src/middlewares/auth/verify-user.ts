import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ERROR from "../web_server/http-error";

/**
 * ✅ Middleware: Verify User JWT
 * @function verifyUser
 * @description Validates the Bearer token in Authorization header for a regular user.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <Token>" → "<Token>"

    if (!token) {
      throw new ERROR.BadRequestError("Authorization Error: Token missing!");
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) {
        return next(new ERROR.AuthorizationError("Authorization Error: Invalid or expired token!"));
      }

      req.body.userId = user._id; // attach userId to request
      next();
    });
  } catch (error) {
    next(error);
  }
};
