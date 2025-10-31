import { UserRole } from "../models/users/users.model";


class UserEntity {
  public documentStatus: string | null;
  public fullName: string;
  public email: string;
  public userRole: UserRole | null; // ✅ strictly typed enum
  public teamId: string | null;
  public isProjectAdmin: boolean;
  public isTeamAdmin: boolean;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: string | null,
    fullName: string,
    email: string,
    userRole: UserRole | null, // ✅ use enum type
    teamId: string | null,
    isProjectAdmin: boolean,
    isTeamAdmin: boolean,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus ?? "active";
    this.fullName = fullName.trim();
    this.email = email.toLowerCase();
    this.userRole = userRole ?? null;
    this.teamId = teamId ?? null;
    this.isProjectAdmin = isProjectAdmin ?? false;
    this.isTeamAdmin = isTeamAdmin ?? false;
    this.createdUser = createdUser ?? null;
    this.createdAt = createdAt ?? new Date();
    this.updatedUser = updatedUser ?? null;
    this.updatedAt = updatedAt ?? new Date();
  }
}

export default UserEntity;
