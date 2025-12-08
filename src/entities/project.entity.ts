// src/entities/project.entity.ts

export default class ProjectEntity {
  public documentStatus: boolean;
  public projectCode: string;
  public projectName: string;
  public description: string | null;
  public clientName: string | null;

  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: boolean,
    projectCode: string,
    projectName: string,
    description: string | null,
    clientName: string | null,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null,
  ) {
    this.documentStatus = documentStatus ?? true;
    this.projectCode = projectCode.trim();
    this.projectName = projectName.trim();
    this.description = description ?? null;
    this.clientName = clientName ?? null;

    this.createdUser = createdUser ?? null;
    this.createdAt = createdAt ?? new Date();
    this.updatedUser = updatedUser ?? null;
    this.updatedAt = updatedAt ?? new Date();
  }
}
