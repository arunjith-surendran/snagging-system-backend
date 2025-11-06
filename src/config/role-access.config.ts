import { UserRole } from '../types/user';

export const RoleAccessConfig = {
  MODULE_ACCESS: {
    ADMIN: [
      UserRole.SUPER_ADMIN_ADMIN, // full access
    ],

    TEAMS: [
      UserRole.SUPER_ADMIN_ADMIN, // manage teams
    ],

    USERS: [
      UserRole.SUPER_ADMIN_ADMIN, // manage users
    ],

    PROJECTS: [
      UserRole.SUPER_ADMIN_ADMIN, // can create/assign projects
      UserRole.INSPECTOR_TEAM, // can view assigned projects, create tickets
      UserRole.QA_VERIFY_TEAM, // can verify/close/reopen tickets
    ],

    BUILDINGS: [UserRole.SUPER_ADMIN_ADMIN, UserRole.INSPECTOR_TEAM, UserRole.QA_VERIFY_TEAM],

    UNITS: [UserRole.SUPER_ADMIN_ADMIN, UserRole.INSPECTOR_TEAM, UserRole.QA_VERIFY_TEAM],

    ISSUE_TYPES: [
      UserRole.SUPER_ADMIN_ADMIN, // full setup
      UserRole.INSPECTOR_TEAM, // can create/open issues
      UserRole.CONTRACTOR_TEAM, // can update open → fixed/in progress
      UserRole.SUB_CONTRACTOR_TEAM, // can update open → fixed/in progress
      UserRole.QA_VERIFY_TEAM, // can close/reopen verified tickets
    ],

    DASHBOARD: [
      UserRole.SUPER_ADMIN_ADMIN, // full visibility
      UserRole.INSPECTOR_TEAM, // assigned projects/buildings only
      UserRole.CONTRACTOR_TEAM, // limited view (own tickets)
      UserRole.SUB_CONTRACTOR_TEAM, // limited view (own tickets)
      UserRole.QA_VERIFY_TEAM, // verification dashboard
    ],
  },

  STATUS_ACCESS: {
    [UserRole.SUPER_ADMIN_ADMIN]: ['open', 'in_progress', 'fixed', 'closed', 'reopen'],
    [UserRole.INSPECTOR_TEAM]: ['open'],
    [UserRole.CONTRACTOR_TEAM]: ['open', 'in_progress', 'fixed'],
    [UserRole.SUB_CONTRACTOR_TEAM]: ['open', 'in_progress', 'fixed'],
    [UserRole.QA_VERIFY_TEAM]: ['closed', 'reopen'],
  },
};
