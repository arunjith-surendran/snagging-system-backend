export interface IUnit {
  id: string;
  documentStatus: string | null;

  buildingId: string;
  projectId: string;

  unitNumber: string;
  floorNumber?: number | null;
  bedrooms?: number | null;
  areaSqft?: number | null;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
