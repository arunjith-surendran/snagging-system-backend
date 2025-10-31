export interface IIssueType {
  id: string;
  documentStatus: string | null;

  category: string;
  type: string;
  item: string;
  current: boolean;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
