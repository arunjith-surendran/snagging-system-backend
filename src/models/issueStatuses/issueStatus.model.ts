export interface IIssueStatus {
  id: string;
  documentStatus: boolean;
  statusName: string;
  fullName: string;
  allowHigherRoles: boolean;
  isActive: boolean;
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
