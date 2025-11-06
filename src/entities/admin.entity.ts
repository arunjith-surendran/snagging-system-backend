// src/entities/admin.entity.ts
import { UserRole } from "../types/user";

class AdminEntity {
  public documentStatus: boolean;
  public adminUserName: string;
  public adminUserType: UserRole; // ✅ Enum, not string
  public email: string;
  public password: string;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: boolean,
    adminUserName: string,
    adminUserType: UserRole,
    email: string,
    password: string,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;
    this.adminUserName = adminUserName.trim();
    this.adminUserType = adminUserType; // ✅ enum inside domain
    this.email = email.toLowerCase();
    this.password = password;
    this.createdUser = createdUser ?? null;
    this.createdAt = createdAt ?? new Date();
    this.updatedUser = updatedUser ?? null;
    this.updatedAt = updatedAt ?? new Date();
  }
}

export default AdminEntity;
