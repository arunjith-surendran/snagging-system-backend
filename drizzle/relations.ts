import { relations } from "drizzle-orm/relations";
import { projects, buildings, issues, units, teams, users, tokens } from "./schema";

export const buildingsRelations = relations(buildings, ({one, many}) => ({
	project: one(projects, {
		fields: [buildings.projectId],
		references: [projects.id]
	}),
	units: many(units),
}));

export const projectsRelations = relations(projects, ({many}) => ({
	buildings: many(buildings),
	issues: many(issues),
	units: many(units),
}));

export const issuesRelations = relations(issues, ({one}) => ({
	project: one(projects, {
		fields: [issues.projectId],
		references: [projects.id]
	}),
	unit: one(units, {
		fields: [issues.unitId],
		references: [units.id]
	}),
	team_createdByTeam: one(teams, {
		fields: [issues.createdByTeam],
		references: [teams.id],
		relationName: "issues_createdByTeam_teams_id"
	}),
	user_createdByUser: one(users, {
		fields: [issues.createdByUser],
		references: [users.id],
		relationName: "issues_createdByUser_users_id"
	}),
	team_assignedTeam: one(teams, {
		fields: [issues.assignedTeam],
		references: [teams.id],
		relationName: "issues_assignedTeam_teams_id"
	}),
	user_assignedUser: one(users, {
		fields: [issues.assignedUser],
		references: [users.id],
		relationName: "issues_assignedUser_users_id"
	}),
}));

export const unitsRelations = relations(units, ({one, many}) => ({
	issues: many(issues),
	building: one(buildings, {
		fields: [units.buildingId],
		references: [buildings.id]
	}),
	project: one(projects, {
		fields: [units.projectId],
		references: [projects.id]
	}),
}));

export const teamsRelations = relations(teams, ({many}) => ({
	issues_createdByTeam: many(issues, {
		relationName: "issues_createdByTeam_teams_id"
	}),
	issues_assignedTeam: many(issues, {
		relationName: "issues_assignedTeam_teams_id"
	}),
	users: many(users),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	issues_createdByUser: many(issues, {
		relationName: "issues_createdByUser_users_id"
	}),
	issues_assignedUser: many(issues, {
		relationName: "issues_assignedUser_users_id"
	}),
	team: one(teams, {
		fields: [users.teamId],
		references: [teams.id]
	}),
	tokens: many(tokens),
}));

export const tokensRelations = relations(tokens, ({one}) => ({
	user: one(users, {
		fields: [tokens.userId],
		references: [users.id]
	}),
}));