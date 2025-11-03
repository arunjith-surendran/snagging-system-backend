CREATE TYPE "public"."team_type_enum" AS ENUM('super_admin_admin', 'inspector_team', 'contractor_team', 'sub_contractor_team', 'qa_verify_team');--> statement-breakpoint
CREATE TYPE "public"."token_type" AS ENUM('access', 'refresh');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin_admin', 'inspector_team', 'contractor_team', 'sub_contractor_team', 'qa_verify_team');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" boolean DEFAULT true NOT NULL,
	"admin_user_name" text NOT NULL,
	"admin_user_type" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "buildings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" text DEFAULT 'active',
	"project_id" uuid NOT NULL,
	"building_code" text NOT NULL,
	"building_name" text NOT NULL,
	"floors" integer,
	"address" text,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_buildings_project_code" UNIQUE("project_id","building_code")
);
--> statement-breakpoint
CREATE TABLE "issues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" boolean DEFAULT true NOT NULL,
	"project_id" uuid NOT NULL,
	"unit_id" uuid,
	"project_name" text NOT NULL,
	"unit_number" text,
	"status" text DEFAULT 'Open' NOT NULL,
	"created_by_team" uuid,
	"created_by_user" uuid,
	"assigned_team" uuid,
	"assigned_user" uuid,
	"title" text NOT NULL,
	"description" text,
	"priority" text DEFAULT 'Medium' NOT NULL,
	"due_date" timestamp with time zone,
	"media_base64" text,
	"media_content_type" text,
	"comments" text,
	"category" text,
	"issue_type" text,
	"issue_item" text,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issue_statuses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" text DEFAULT 'active',
	"status_name" text NOT NULL,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issue_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" text DEFAULT 'active',
	"category" text NOT NULL,
	"type" text NOT NULL,
	"item" text NOT NULL,
	"current" boolean DEFAULT true NOT NULL,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_code" text NOT NULL,
	"project_name" text NOT NULL,
	"description" text,
	"client_name" text,
	"location" text,
	"phase" text,
	"assigned_inspector_id" text,
	"assigned_contractor_id" text,
	"assigned_sub_contractor_id" text,
	"assigned_verifier_id" text,
	"document_status" boolean DEFAULT true NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" boolean DEFAULT true NOT NULL,
	"team_name" text NOT NULL,
	"team_initials" text,
	"team_type" "team_type_enum" NOT NULL,
	"team_address" text,
	"team_telephone" text,
	"team_email" text,
	"team_role" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" boolean DEFAULT true NOT NULL,
	"token" text NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "token_type" NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	"blacklisted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" text DEFAULT 'active',
	"building_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"unit_number" text NOT NULL,
	"floor_number" integer,
	"bedrooms" integer,
	"area_sqft" numeric(10, 2),
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_units_building_unit" UNIQUE("building_id","unit_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" text DEFAULT 'active',
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"user_role" "user_role" NOT NULL,
	"team_id" uuid,
	"is_project_admin" boolean DEFAULT false NOT NULL,
	"is_team_admin" boolean DEFAULT false NOT NULL,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_created_by_team_teams_id_fk" FOREIGN KEY ("created_by_team") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_created_by_user_users_id_fk" FOREIGN KEY ("created_by_user") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assigned_team_teams_id_fk" FOREIGN KEY ("assigned_team") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assigned_user_users_id_fk" FOREIGN KEY ("assigned_user") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_admins_email" ON "admins" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_buildings_project" ON "buildings" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_issues_project" ON "issues" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_issues_unit" ON "issues" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "idx_issues_status" ON "issues" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_issues_assigned_team" ON "issues" USING btree ("assigned_team");--> statement-breakpoint
CREATE INDEX "idx_issues_assigned_user" ON "issues" USING btree ("assigned_user");--> statement-breakpoint
CREATE INDEX "idx_issues_due" ON "issues" USING btree ("due_date");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_issue_statuses_name" ON "issue_statuses" USING btree ("status_name");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_issue_types_combination" ON "issue_types" USING btree ("category","type","item");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_projects_code" ON "projects" USING btree ("project_code");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_teams_team_name" ON "teams" USING btree ("team_name");--> statement-breakpoint
CREATE INDEX "idx_units_building" ON "units" USING btree ("building_id");--> statement-breakpoint
CREATE INDEX "idx_units_floor" ON "units" USING btree ("floor_number");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_users_email" ON "users" USING btree ("email");