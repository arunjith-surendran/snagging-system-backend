DROP INDEX "uq_issue_types_combination";--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "Category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "Type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "Item" text NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "Current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_issue_types_combination" ON "issue_types" USING btree ("Category","Type","Item");--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "document_status";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "item";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "current";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "created_user";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "updated_user";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "updated_at";