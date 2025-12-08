// src/entities/project.entity.ts

export default class ProjectEntity {
  public documentStatus: boolean;
  public projectCode: string;
  public projectName: string;
  public description: string | null;
  public clientName: string | null;

  constructor(
    documentStatus: boolean,
    projectCode: string,
    projectName: string,
    description: string | null,
    clientName: string | null,
  ) {
    this.documentStatus = documentStatus ?? true;
    this.projectCode = projectCode.trim();
    this.projectName = projectName.trim();
    this.description = description ?? null;
    this.clientName = clientName ?? null;

  }
}
