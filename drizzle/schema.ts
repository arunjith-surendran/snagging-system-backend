import { pgTable, uniqueIndex, uuid, boolean, text, timestamp, index, foreignKey, unique, integer, numeric, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const teamRoleEnum = pgEnum("team_role_enum", ['super_admin_admin', 'inspector_team', 'contractor_team', 'sub_contractor_team', 'qa_verify_team'])
export const tokenType = pgEnum("token_type", ['access', 'refresh'])
export const userRole = pgEnum("user_role", ['super_admin_admin', 'inspector_team', 'contractor_team', 'sub_contractor_team', 'qa_verify_team'])


export const admins = pgTable("admins", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: boolean("document_status").default(true).notNull(),
	adminUserName: text("admin_user_name").notNull(),
	adminUserType: text("admin_user_type").notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	uniqueIndex("uq_admins_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const issueTypes = pgTable("issue_types", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: text("document_status").default('active'),
	category: text().notNull(),
	type: text().notNull(),
	item: text().notNull(),
	current: boolean().default(true).notNull(),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("uq_issue_types_combination").using("btree", table.category.asc().nullsLast().op("text_ops"), table.type.asc().nullsLast().op("text_ops"), table.item.asc().nullsLast().op("text_ops")),
]);

export const projects = pgTable("projects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: boolean("document_status").default(true).notNull(),
	projectCode: text("project_code").notNull(),
	projectName: text("project_name").notNull(),
	description: text(),
	clientName: text("client_name"),
	location: text(),
	phase: text(),
	assignedInspectorId: uuid("assigned_inspector_id"),
	assignedContractorId: uuid("assigned_contractor_id"),
	assignedSubContractorId: uuid("assigned_sub_contractor_id"),
	assignedVerifierId: uuid("assigned_verifier_id"),
	startDate: timestamp("start_date", { withTimezone: true, mode: 'string' }),
	endDate: timestamp("end_date", { withTimezone: true, mode: 'string' }),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("uq_projects_code").using("btree", table.projectCode.asc().nullsLast().op("text_ops")),
]);

export const buildings = pgTable("buildings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: text("document_status").default('active'),
	projectId: uuid("project_id").notNull(),
	buildingCode: text("building_code").notNull(),
	buildingName: text("building_name").notNull(),
	floors: integer(),
	address: text(),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_buildings_project").using("btree", table.projectId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "buildings_project_id_projects_id_fk"
		}).onDelete("cascade"),
	unique("uq_buildings_project_code").on(table.projectId, table.buildingCode),
]);

export const issues = pgTable("issues", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: boolean("document_status").default(true).notNull(),
	projectId: uuid("project_id").notNull(),
	unitId: uuid("unit_id"),
	projectName: text("project_name").notNull(),
	unitNumber: text("unit_number"),
	status: text().default('Open').notNull(),
	createdByTeam: uuid("created_by_team"),
	createdByUser: uuid("created_by_user"),
	assignedTeam: uuid("assigned_team"),
	assignedUser: uuid("assigned_user"),
	title: text().notNull(),
	description: text(),
	priority: text().default('Medium').notNull(),
	dueDate: timestamp("due_date", { withTimezone: true, mode: 'string' }),
	mediaBase64: text("media_base64"),
	mediaContentType: text("media_content_type"),
	comments: text(),
	category: text(),
	issueType: text("issue_type"),
	issueItem: text("issue_item"),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_issues_assigned_team").using("btree", table.assignedTeam.asc().nullsLast().op("uuid_ops")),
	index("idx_issues_assigned_user").using("btree", table.assignedUser.asc().nullsLast().op("uuid_ops")),
	index("idx_issues_due").using("btree", table.dueDate.asc().nullsLast().op("timestamptz_ops")),
	index("idx_issues_project").using("btree", table.projectId.asc().nullsLast().op("uuid_ops")),
	index("idx_issues_status").using("btree", table.status.asc().nullsLast().op("text_ops")),
	index("idx_issues_unit").using("btree", table.unitId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "issues_project_id_projects_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.unitId],
			foreignColumns: [units.id],
			name: "issues_unit_id_units_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.createdByTeam],
			foreignColumns: [teams.id],
			name: "issues_created_by_team_teams_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.createdByUser],
			foreignColumns: [users.id],
			name: "issues_created_by_user_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.assignedTeam],
			foreignColumns: [teams.id],
			name: "issues_assigned_team_teams_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.assignedUser],
			foreignColumns: [users.id],
			name: "issues_assigned_user_users_id_fk"
		}).onDelete("set null"),
]);

export const units = pgTable("units", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: text("document_status").default('active'),
	buildingId: uuid("building_id").notNull(),
	projectId: uuid("project_id").notNull(),
	unitNumber: text("unit_number").notNull(),
	floorNumber: integer("floor_number"),
	bedrooms: integer(),
	areaSqft: numeric("area_sqft", { precision: 10, scale:  2 }),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_units_building").using("btree", table.buildingId.asc().nullsLast().op("uuid_ops")),
	index("idx_units_floor").using("btree", table.floorNumber.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.buildingId],
			foreignColumns: [buildings.id],
			name: "units_building_id_buildings_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "units_project_id_projects_id_fk"
		}).onDelete("cascade"),
	unique("uq_units_building_unit").on(table.buildingId, table.unitNumber),
]);

export const teams = pgTable("teams", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: boolean("document_status").default(true).notNull(),
	teamName: text("team_name").notNull(),
	teamInitials: text("team_initials"),
	teamType: text("team_type"),
	teamAddress: text("team_address"),
	teamTelephone: text("team_telephone"),
	teamEmail: text("team_email"),
	teamRole: teamRoleEnum("team_role").default('contractor_team'),
	active: boolean().default(true).notNull(),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("uq_teams_team_name").using("btree", table.teamName.asc().nullsLast().op("text_ops")),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: boolean("document_status").default(true).notNull(),
	fullName: text("full_name").notNull(),
	email: text().notNull(),
	password: text().notNull(),
	userRole: userRole("user_role").notNull(),
	teamId: uuid("team_id"),
	teamName: text("team_name"),
	isProjectAdmin: boolean("is_project_admin").default(false).notNull(),
	isTeamAdmin: boolean("is_team_admin").default(false).notNull(),
	createdUser: text("created_user"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedUser: text("updated_user"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("uq_users_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [teams.id],
			name: "users_team_id_teams_id_fk"
		}).onDelete("set null"),
]);

export const tokens = pgTable("tokens", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	documentStatus: boolean("document_status").default(true).notNull(),
	token: text().notNull(),
	userId: uuid("user_id").notNull(),
	type: tokenType().notNull(),
	expires: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	blacklisted: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "tokens_user_id_users_id_fk"
		}).onDelete("cascade"),
]);
