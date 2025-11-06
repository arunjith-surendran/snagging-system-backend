import { UserRole } from "../types/user";

export default class TeamEntity {
  public documentStatus: boolean;
  public teamName: string;
  public teamInitials: string | null;
  public teamType: string | null;
  public teamAddress: string | null;
  public teamTelephone: string | null;
  public teamEmail: string | null;
  public teamRole: UserRole | null;
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
    teamRole: UserRole | null,
    active: boolean,
    createdUser: string | null,
    createdAt: Date | null,
    updatedUser: string | null,
    updatedAt: Date | null
  ) {
    this.documentStatus = documentStatus ?? true;
    this.teamName = teamName.trim();
    this.teamInitials = teamInitials ?? null;
    this.teamType = teamType ?? null;
    this.teamAddress = teamAddress ?? null;
    this.teamTelephone = teamTelephone ?? null;
    this.teamEmail = teamEmail?.toLowerCase() ?? null;
    this.teamRole = teamRole ?? null;
    this.active = active ?? true;

    this.createdUser = createdUser ?? null;
    this.createdAt = createdAt ?? new Date();
    this.updatedUser = updatedUser ?? null;
    this.updatedAt = updatedAt ?? new Date();
  }
}
