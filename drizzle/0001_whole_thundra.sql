ALTER TABLE "projects" ALTER COLUMN "assigned_inspector_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "assigned_contractor_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "assigned_sub_contractor_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "assigned_verifier_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "document_status" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "document_status" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "document_status" SET NOT NULL;