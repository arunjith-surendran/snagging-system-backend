class IssueEntity {
  public documentStatus: boolean

  public projectId: string;
  public unitId: string;
  public projectName: string;
  public unitNumber: string;

  public status: string;

  public createdByTeam: string | null;
  public createdByUser: string | null;
  public assignedTeam: string | null;
  public assignedUser: string | null;

  public title: string;
  public description: string | null;
  public priority: string;
  public dueDate: Date | null;

  public mediaBase64: string | null;
  public mediaContentType: string | null;

  public comments: string | null;
  public category: string | null;
  public issueType: string | null;
  public issueItem: string | null;
  public location: string | null;

  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: boolean,
    projectId: string,
    unitId: string,
    projectName: string,
    unitNumber: string,
    status: string,
    createdByTeam: string | null,
    createdByUser: string | null,
    assignedTeam: string | null,
    assignedUser: string | null,
    title: string,
    description: string | null,
    priority: string,
    dueDate: Date | null,
    mediaBase64: string | null,
    mediaContentType: string | null,
    comments: string | null,
    category: string | null,
    issueType: string | null,
    issueItem: string | null,
    location: string | null,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;

    this.projectId = projectId;
    this.unitId = unitId;
    this.projectName = projectName;
    this.unitNumber = unitNumber;

    this.status = status;

    this.createdByTeam = createdByTeam;
    this.createdByUser = createdByUser;
    this.assignedTeam = assignedTeam;
    this.assignedUser = assignedUser;

    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;

    this.mediaBase64 = mediaBase64;
    this.mediaContentType = mediaContentType;

    this.comments = comments;
    this.category = category;
    this.issueType = issueType;
    this.issueItem = issueItem;
    this.location = location;

    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default IssueEntity;
