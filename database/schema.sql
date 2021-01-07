
drop schema "public" cascade;

create schema "public";

CREATE TABLE "UserInfo" (
	"userId" serial NOT NULL,
	"fullName" TEXT NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "UserInfo_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reviews" (
	"reviewId" serial NOT NULL,
	"hotelName" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"reviewContent" TEXT NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favorites" (
	"hotelId" integer NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	"hotelName" text NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comment Replies" (
	"commentId" serial NOT NULL,
	"userId" serial NOT NULL,
	"commentContent" TEXT NOT NULL,
	CONSTRAINT "comment Replies_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("userId") REFERENCES "UserInfo"("userId");

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userId") REFERENCES "UserInfo"("userId");

ALTER TABLE "comment Replies" ADD CONSTRAINT "comment Replies_fk0" FOREIGN KEY ("userId") REFERENCES "UserInfo"("userId");
