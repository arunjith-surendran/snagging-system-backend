DROP INDEX "uq_issue_types_combination";--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "item" text NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "created_user" text;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "updated_user" text;--> statement-breakpoint
ALTER TABLE "issue_types" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "created_user" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "updated_user" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_issue_types_combination" ON "issue_types" USING btree ("category","type","item");--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "Category";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "Type";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "Item";--> statement-breakpoint
ALTER TABLE "issue_types" DROP COLUMN "Current";