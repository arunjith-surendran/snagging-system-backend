import { UserRole } from "../../types/user";

/**
 * ✅ IUser — represents a complete user record including optional team info
 */
export interface IUser {
  id: string;
  documentStatus: boolean;

  fullName: string;
  email: string;
  password: string;
  userRole: UserRole;

  teamId?: string | null;
  teamName?: string | null; 

  isProjectAdmin: boolean;
  isTeamAdmin: boolean;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
