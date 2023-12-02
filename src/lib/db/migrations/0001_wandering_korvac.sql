CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"public" boolean DEFAULT false NOT NULL,
	"slug" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
