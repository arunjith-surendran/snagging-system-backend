export enum IssueStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  FIXED = 'Fixed',
  VERIFIED = 'Verified',
  REOPENED = 'Reopened',
  CLOSED = 'Closed',
}

export enum IssuePriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface IIssue {
  id: string;
  documentStatus: boolean;
  projectId: string;
  unitId?: string | null;
  projectName: string;
  unitNumber?: string | null;
  status: IssueStatus;
  createdByTeam?: string | null;
  createdByUser?: string | null;
  assignedTeam?: string | null;
  assignedUser?: string | null;
  title: string;
  description?: string | null;
  priority: IssuePriority;
  dueDate?: Date | null;
  mediaBase64?: string | null;
  mediaContentType?: string | null;
  comments?: string | null;
  category?: string | null;
  issueType?: string | null;
  issueItem?: string | null;
  location?: string | null;
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
