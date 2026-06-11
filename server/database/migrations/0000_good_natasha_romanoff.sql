CREATE TABLE "cursors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"page" varchar(255) NOT NULL,
	"x" real NOT NULL,
	"y" real NOT NULL,
	"lastUpdated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "page_idx" ON "cursors" USING btree ("page");--> statement-breakpoint
CREATE INDEX "updated_idx" ON "cursors" USING btree ("lastUpdated");