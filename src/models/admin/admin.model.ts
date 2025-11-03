// src/models/admin/admin.model.ts
import { UserRole } from "../../types/user";

export interface IAdmin {
  id: string;
  documentStatus: boolean;
  adminUserName: string;
  adminUserType: UserRole; 
  email: string;
  password: string;
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
