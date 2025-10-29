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

  constructor(
    documentStatus: boolean,
    teamName: string,
    teamInitials: string | null,
    teamType: string | null,
    teamAddress: string | null,
    teamTelephone: string | null,
    teamEmail: string | null,
    teamRole: string | null,
    active: boolean,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
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
