CREATE TABLE "types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"word_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "words_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"type" varchar(50) NOT NULL,
	"link" varchar(255) NOT NULL,
	"description" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "words_name_unique" UNIQUE("name"),
	CONSTRAINT "words_link_unique" UNIQUE("link")
);
--> statement-breakpoint
ALTER TABLE "types" ADD CONSTRAINT "types_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE restrict ON UPDATE no action;