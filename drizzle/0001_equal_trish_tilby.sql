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
	"document_status" text DEFAULT 'active',
	"project_id" uuid NOT NULL,
	"unit_id" uuid NOT NULL,
	"status" text NOT NULL,
	"created_by_team" uuid,
	"created_by_user" uuid,
	"assigned_team" uuid,
	"assigned_user" uuid,
	"title" text NOT NULL,
	"description" text,
	"priority" text DEFAULT 'medium' NOT NULL,
	"due_date" timestamp with time zone,
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
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_status" text DEFAULT 'active',
	"project_code" text NOT NULL,
	"project_name" text NOT NULL,
	"description" text,
	"client_name" text,
	"created_user" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_user" text,
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
DROP INDEX "uq_teams_name";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_project_admin" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_team_admin" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "document_status" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_initials" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_type" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_address" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_telephone" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_email" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_role" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "created_user" text;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "updated_user" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "document_status" text DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_user" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_user" text;--> statement-breakpoint
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_created_by_team_teams_id_fk" FOREIGN KEY ("created_by_team") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_created_by_user_users_id_fk" FOREIGN KEY ("created_by_user") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assigned_team_teams_id_fk" FOREIGN KEY ("assigned_team") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_assigned_user_users_id_fk" FOREIGN KEY ("assigned_user") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_buildings_project" ON "buildings" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_issues_project" ON "issues" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_issues_unit" ON "issues" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "idx_issues_status" ON "issues" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_issues_assigned_team" ON "issues" USING btree ("assigned_team");--> statement-breakpoint
CREATE INDEX "idx_issues_assigned_user" ON "issues" USING btree ("assigned_user");--> statement-breakpoint
CREATE INDEX "idx_issues_due" ON "issues" USING btree ("due_date");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_issue_statuses_name" ON "issue_statuses" USING btree ("status_name");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_projects_code" ON "projects" USING btree ("project_code");--> statement-breakpoint
CREATE INDEX "idx_units_building" ON "units" USING btree ("building_id");--> statement-breakpoint
CREATE INDEX "idx_units_floor" ON "units" USING btree ("floor_number");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_teams_team_name" ON "teams" USING btree ("team_name");--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "teams_name";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "teams_initials";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "teams_type";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "teams_address";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "teams_telephone";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "teams_email";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "teams_role";