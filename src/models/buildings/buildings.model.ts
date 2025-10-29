export interface IBuilding {
  id: string;
  documentStatus: string | null;
  projectId: string;
  buildingCode: string;
  buildingName: string;
  floors?: number | null;
  address?: string | null;
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
