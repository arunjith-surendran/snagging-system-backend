export interface IProject {
  id: string;
  documentStatus: string | null;
  projectCode: string;
  projectName: string;
  description?: string | null;
  clientName?: string | null;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
