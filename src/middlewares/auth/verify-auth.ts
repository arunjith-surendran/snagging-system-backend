import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import ERROR from "../web_server/http-error";

export interface AuthUser {
  id: string;
  email: string;
  userRole: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

/**
 * ✅ Verify JWT and attach user info
 * @param {AuthRequest} req - Express request containing Bearer token
 * @param {Response} _res - Express response
 * @param {NextFunction} next - Express next middleware
 */
export const verifyAuth = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      throw new ERROR.AuthorizationError("Authorization Error: Token missing!");
    }

    // ✅ Use sync verify to guarantee decoded value before proceeding
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload & AuthUser;

    if (!decoded?.id) {
      throw new ERROR.AuthorizationError("Authorization Error: Invalid or expired token!");
    }

    // ✅ Attach decoded info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      userRole: decoded.userRole,
    };

    // Optional debug log
    console.log("🔐 Authenticated User →", req.user);

    next();
  } catch (error) {
    next(error);
  }
};
