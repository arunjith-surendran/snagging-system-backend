// src/interfaces/project.interface.ts
export interface IProject {
  id?: string;

  // 🔒 Status
  documentStatus: boolean;

  // 🏗️ Project Info
  projectCode: string;
  projectName: string;
  description?: string | null;
  clientName?: string | null;
  // location?: string | null;
  // phase?: string | null;

  // // 👥 Assigned Team References
  // assignedInspectorId?: string | null;
  // assignedContractorId?: string | null;
  // assignedSubContractorId?: string | null;
  // assignedVerifierId?: string | null;

  // // 🗓️ Timeline
  // startDate?: Date | string | null;
  // endDate?: Date | string | null;

  // 🧾 Audit Trail
  // createdUser?: string | null;
  // createdAt?: Date | string | null;
  // updatedUser?: string | null;
  // updatedAt?: Date | string | null;
}
