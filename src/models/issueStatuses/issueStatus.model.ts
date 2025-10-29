export interface IIssueStatus {
  id: string;
  documentStatus: string | null;
  statusName: string;
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
