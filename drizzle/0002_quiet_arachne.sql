ALTER TYPE "public"."team_type_enum" RENAME TO "team_role_enum";--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "team_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "team_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "team_role" SET DATA TYPE "public"."team_role_enum" USING "team_role"::"public"."team_role_enum";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "location";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "phase";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "assigned_inspector_id";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "assigned_contractor_id";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "assigned_sub_contractor_id";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "assigned_verifier_id";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "start_date";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "end_date";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "created_user";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "updated_user";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "updated_at";