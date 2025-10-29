class TeamEntity {
  public documentStatus: boolean;
  public teamName: string;
  public teamInitials: string | null;
  public teamType: string | null;
  public teamAddress: string | null;
  public teamTelephone: string | null;
  public teamEmail: string | null;
  public teamRole: string | null;
  public active: boolean;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor({
    documentStatus = true,
    teamName,
    teamInitials = null,
    teamType = null,
    teamAddress = null,
    teamTelephone = null,
    teamEmail = null,
    teamRole = null,
    active = true,
    createdUser = "system-upload",
    createdAt = new Date(),
    updatedUser = "system-upload",
    updatedAt = new Date(),
  }: Partial<TeamEntity> & { teamName: string }) {
    this.documentStatus = documentStatus;
    this.teamName = teamName;
    this.teamInitials = teamInitials;
    this.teamType = teamType;
    this.teamAddress = teamAddress;
    this.teamTelephone = teamTelephone;
    this.teamEmail = teamEmail;
    this.teamRole = teamRole;
    this.active = active;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default TeamEntity;
