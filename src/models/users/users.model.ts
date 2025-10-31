export enum UserRole {
  INSPECTOR_TEAM = "Inspector Team",          // T2
  CONTRACTOR_TEAM = "Contractor Team",        // T3
  SUB_CONTRACTOR_TEAM = "Sub-Contractor Team",// T4
  QA_VERIFY_TEAM = "Verify Team", // T5 (or T1)
}

export interface IUser {
  id: string;
  documentStatus: string | null;

  fullName: string;
  email: string;
  userRole?: string | null;

  teamId?: string | null;
  isProjectAdmin: boolean;
  isTeamAdmin: boolean;

  createdUser: string | null;
  createdAt: Date | null;
  updatedUser: string | null;
  updatedAt: Date | null;
}
