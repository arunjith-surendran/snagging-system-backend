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
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teams_name" text NOT NULL,
	"teams_initials" text,
	"teams_type" text,
	"teams_address" text,
	"teams_telephone" text,
	"teams_email" text,
	"teams_role" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"user_role" text,
	"team_id" uuid,
	"is_project_admin" boolean DEFAULT false,
	"is_team_admin" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_admins_email" ON "admins" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_teams_name" ON "teams" USING btree ("teams_name");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_users_email" ON "users" USING btree ("email");