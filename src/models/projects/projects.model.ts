export interface IProject {
  id?: string;
  documentStatus: boolean;
  projectCode: string;
  projectName: string;
  description?: string | null;
  clientName?: string | null;
  location?: string | null;
  phase?: string | null;
  assignedInspectorId?: string | null;
  assignedContractorId?: string | null;
  assignedSubContractorId?: string | null;
  assignedVerifierId?: string | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  createdUser: string | null;
  createdAt: Date | string | null;
  updatedUser: string | null;
  updatedAt: Date | string | null;
}
