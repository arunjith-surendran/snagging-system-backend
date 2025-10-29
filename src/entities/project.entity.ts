class ProjectEntity {
  public documentStatus: string | null;
  public projectCode: string;
  public projectName: string;
  public description: string | null;
  public clientName: string | null;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: string | null,
    projectCode: string,
    projectName: string,
    description: string | null,
    clientName: string | null,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;
    this.projectCode = projectCode;
    this.projectName = projectName;
    this.description = description;
    this.clientName = clientName;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default ProjectEntity;
