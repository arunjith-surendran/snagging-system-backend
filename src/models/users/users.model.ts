import { UserRole } from "./users.schema";

export interface IUser {
  id: string;
  documentStatus: string | null;

  fullName: string;
  email: string;
  userRole: UserRole; // ✅ from schema (single source)

  teamId?: string | null;
  isProjectAdmin: boolean;
  isTeamAdmin: boolean;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
