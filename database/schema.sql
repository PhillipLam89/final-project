set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "UserInfo" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "UserInfo_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reviews" (
	"reviewId" serial NOT NULL,
	"hotelName" TEXT NOT NULL,
	"userID" TEXT NOT NULL,
	"reviewContent" TEXT NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favorites" (
	"hotelName" TEXT NOT NULL UNIQUE,
	"userID" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comment Replies" (
	"commentId" serial NOT NULL,
	"userID" serial NOT NULL,
	"commentContent" TEXT NOT NULL,
	CONSTRAINT "comment Replies_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("userID") REFERENCES "UserInfo"("userId");

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userID") REFERENCES "UserInfo"("userId");

ALTER TABLE "comment Replies" ADD CONSTRAINT "comment Replies_fk0" FOREIGN KEY ("userID") REFERENCES "UserInfo"("userId");
