import { UserRole } from "../../types/user";


export interface IUser {
  id: string;
  documentStatus: boolean

  fullName: string;
  email: string;
  password: string; 
  userRole: UserRole; 

  teamId?: string | null;
  isProjectAdmin: boolean;
  isTeamAdmin: boolean;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
