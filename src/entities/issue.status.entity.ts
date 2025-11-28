class IssueStatusEntity {
  public documentStatus: boolean;
  public statusName: string;
  public fullName: string;
  public allowHigherRoles: boolean;
  public isActive: boolean;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: boolean,
    statusName: string,
    fullName: string,
    allowHigherRoles: boolean,
    isActive: boolean,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;
    this.statusName = statusName;
    this.fullName = fullName;
    this.allowHigherRoles = allowHigherRoles;
    this.isActive = isActive;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default IssueStatusEntity;
