export interface IIssue {
  id: string;
  documentStatus: string | null;

  projectId: string;
  unitId: string;
  projectName: string;
  unitNumber: string;

  status: string; // 'Open' | 'Fixed' | 'Verified' | 'Reopened' | 'Closed'

  createdByTeam: string | null;
  createdByUser: string | null;
  assignedTeam: string | null;
  assignedUser: string | null;

  title: string;
  description?: string | null;
  priority: string; // 'low' | 'medium' | 'high'
  dueDate?: Date | null;

  mediaBase64?: string | null;
  mediaContentType?: string | null;

  comments?: string | null;
  category?: string | null;
  issueType?: string | null;
  issueItem?: string | null;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
