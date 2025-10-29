class IssueEntity {
  public documentStatus: string | null;

  public projectId: string;
  public unitId: string;

  public status: string;

  public createdByTeam: string | null;
  public createdByUser: string | null;
  public assignedTeam: string | null;
  public assignedUser: string | null;

  public title: string;
  public description: string | null;
  public priority: string;
  public dueDate: Date | null;

  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: string | null,
    projectId: string,
    unitId: string,
    status: string,
    createdByTeam: string | null,
    createdByUser: string | null,
    assignedTeam: string | null,
    assignedUser: string | null,
    title: string,
    description: string | null,
    priority: string,
    dueDate: Date | null,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;

    this.projectId = projectId;
    this.unitId = unitId;

    this.status = status;

    this.createdByTeam = createdByTeam;
    this.createdByUser = createdByUser;
    this.assignedTeam = assignedTeam;
    this.assignedUser = assignedUser;

    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;

    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default IssueEntity;
