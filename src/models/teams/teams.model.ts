export interface ITeam {
  id: string;
  documentStatus: boolean;
  teamName: string;
  teamInitials?: string | null;
  teamType?: string | null;
  teamAddress?: string | null;
  teamTelephone?: string | null;
  teamEmail?: string | null;
  teamRole?: string | null;
  active: boolean;
  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}