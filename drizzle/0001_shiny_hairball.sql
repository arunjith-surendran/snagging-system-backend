ALTER TABLE "issue_statuses" ALTER COLUMN "document_status" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "issue_statuses" ALTER COLUMN "document_status" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "issue_statuses" ALTER COLUMN "document_status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_statuses" ADD COLUMN "full_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_statuses" ADD COLUMN "allow_higher_roles" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_statuses" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;