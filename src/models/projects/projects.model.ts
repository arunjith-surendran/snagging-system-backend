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

}
