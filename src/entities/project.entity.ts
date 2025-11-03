// src/entities/project.entity.ts

export default class ProjectEntity {
  public documentStatus: boolean;
  public projectCode: string;
  public projectName: string;
  public description: string | null;
  public clientName: string | null;
  public location: string | null;
  public phase: string | null;

  public assignedInspectorId: string | null;
  public assignedContractorId: string | null;
  public assignedSubContractorId: string | null;
  public assignedVerifierId: string | null;

  public startDate: Date | null;
  public endDate: Date | null;

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
    location: string | null,
    phase: string | null,
    assignedInspectorId: string | null,
    assignedContractorId: string | null,
    assignedSubContractorId: string | null,
    assignedVerifierId: string | null,
    startDate: Date | null,
    endDate: Date | null,
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
    this.location = location ?? null;
    this.phase = phase ?? null;

    this.assignedInspectorId = assignedInspectorId ?? null;
    this.assignedContractorId = assignedContractorId ?? null;
    this.assignedSubContractorId = assignedSubContractorId ?? null;
    this.assignedVerifierId = assignedVerifierId ?? null;

    this.startDate = startDate ?? null;
    this.endDate = endDate ?? null;

    this.createdUser = createdUser ?? null;
    this.createdAt = createdAt ?? new Date();
    this.updatedUser = updatedUser ?? null;
    this.updatedAt = updatedAt ?? new Date();
  }
}
