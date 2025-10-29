class BuildingEntity {
  public documentStatus: string | null;
  public projectId: string;
  public buildingCode: string;
  public buildingName: string;
  public floors: number | null;
  public address: string | null;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: string | null,
    projectId: string,
    buildingCode: string,
    buildingName: string,
    floors: number | null,
    address: string | null,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null,
  ) {
    this.documentStatus = documentStatus;
    this.projectId = projectId;
    this.buildingCode = buildingCode;
    this.buildingName = buildingName;
    this.floors = floors;
    this.address = address;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default BuildingEntity;
