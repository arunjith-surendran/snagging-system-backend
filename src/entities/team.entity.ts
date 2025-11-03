import { UserRole } from "../types/user";

class TeamEntity {
  public documentStatus: boolean;
  public teamName: string;
  public teamInitials: string | null;
  public teamType: string | null; // ✅ plain string (not enum)
  public teamAddress: string | null;
  public teamTelephone: string | null;
  public teamEmail: string | null;
  public teamRole: UserRole; // ✅ enum (UserRole)
  public active: boolean;
  public createdUser: string | null;
  public createdAt: Date | null;
  public updatedUser: string | null;
  public updatedAt: Date | null;

  constructor({
    documentStatus = true,
    teamName,
    teamInitials = null,
    teamType = null, // ✅ string type
    teamAddress = null,
    teamTelephone = null,
    teamEmail = null,
    teamRole = UserRole.CONTRACTOR_TEAM, // ✅ default enum value
    active = true,
    createdUser = "system-upload",
    createdAt = new Date(),
    updatedUser = "system-upload",
    updatedAt = new Date(),
  }: Partial<TeamEntity> & { teamName: string }) {
    this.documentStatus = documentStatus;
    this.teamName = teamName.trim();
    this.teamInitials = teamInitials?.trim() ?? null;
    this.teamType = teamType?.trim() ?? null;
    this.teamAddress = teamAddress?.trim() ?? null;
    this.teamTelephone = teamTelephone?.trim() ?? null;
    this.teamEmail = teamEmail?.toLowerCase() ?? null;
    this.teamRole = teamRole;
    this.active = active;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
  }
}

export default TeamEntity;
