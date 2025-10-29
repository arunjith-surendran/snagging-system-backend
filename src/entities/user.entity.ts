class UserEntity {
  public documentStatus: string | null;
  public fullName: string;
  public email: string;
  public userRole: string | null;
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
    userRole: string | null,
    teamId: string | null,
    isProjectAdmin: boolean,
    isTeamAdmin: boolean,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;
    this.fullName = fullName;
    this.email = email;
    this.userRole = userRole;
    this.teamId = teamId;
    this.isProjectAdmin = isProjectAdmin;
    this.isTeamAdmin = isTeamAdmin;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default UserEntity;
