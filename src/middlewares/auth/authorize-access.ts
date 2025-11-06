// src/middlewares/auth/authorize-module.ts
import { Response, NextFunction } from "express";
import { RoleAccessConfig } from "../../config/role-access.config";
import ERROR from "../web_server/http-error";
import { AuthRequest } from "./verify-auth";

/**
 * ✅ Checks if user's role is allowed for the given module
 * @param moduleKey - The key in RoleAccessConfig.MODULE_ACCESS (e.g., "PROJECTS")
 */
export const authorizeModule = (moduleKey: keyof typeof RoleAccessConfig.MODULE_ACCESS) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    const userRole = req.user?.userRole;
    const allowedRoles = RoleAccessConfig.MODULE_ACCESS[moduleKey];

    if (!userRole || !allowedRoles.includes(userRole as any)) {
      return next(
        new ERROR.AuthorizationError(
          `Access Denied: ${userRole ?? "Unknown"} cannot access ${moduleKey} module`
        )
      );
    }

    next();
  };
};
