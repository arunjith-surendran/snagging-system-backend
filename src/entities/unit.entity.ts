class UnitEntity {
  public documentStatus: string | null;
  public buildingId: string;
  public projectId: string;
  public unitNumber: string;
  public floorNumber: number | null;
  public bedrooms: number | null;
  public areaSqft: number | null;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor(
    documentStatus: string | null,
    buildingId: string,
    projectId: string,
    unitNumber: string,
    floorNumber: number | null,
    bedrooms: number | null,
    areaSqft: number | null,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus;
    this.buildingId = buildingId;
    this.projectId = projectId;
    this.unitNumber = unitNumber;
    this.floorNumber = floorNumber;
    this.bedrooms = bedrooms;
    this.areaSqft = areaSqft;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default UnitEntity;
