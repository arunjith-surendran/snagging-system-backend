import { UserRole } from '../types/user';

class UserEntity {
  public documentStatus: boolean;
  public fullName: string;
  public email: string;
  public password: string;
  public userRole: UserRole;
  public teamId: string | null;
  public teamName: string | null;
  public isProjectAdmin: boolean;
  public isTeamAdmin: boolean;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: boolean,
    fullName: string,
    email: string,
    password: string,
    userRole: UserRole,
    teamId: string | null,
    teamName: string | null,
    isProjectAdmin: boolean,
    isTeamAdmin: boolean,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null,
  ) {
    this.documentStatus = documentStatus;
    this.fullName = fullName.trim();
    this.email = email.toLowerCase();
    this.password = password;
    this.userRole = userRole;
    this.teamId = teamId ?? null;
    this.teamName = teamName ?? null;
    this.isProjectAdmin = isProjectAdmin ?? false;
    this.isTeamAdmin = isTeamAdmin ?? false;
    this.createdUser = createdUser ?? null;
    this.createdAt = createdAt ?? new Date();
    this.updatedUser = updatedUser ?? null;
    this.updatedAt = updatedAt ?? new Date();
  }
}

export default UserEntity;
