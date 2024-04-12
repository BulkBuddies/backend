CREATE TABLE "user" (
  "id" uuid DEFAULT gen_random_uuid()  PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "email" varchar(100) UNIQUE NOT NULL,
  "username" varchar(100) UNIQUE NOT NULL,
  "password" varchar(100) NOT NULL,
  "refresh_token" text
);

CREATE TABLE "profile" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "fk_user" uuid,
  "rut" varchar(12),
  "phone" varchar(12),
  "address" varchar(100),
  "comuna_id" int,
  "postal_code" varchar(100),
  "created_at" timestamp,
  "updated_at" timestamp,
  "picture" text
);

CREATE TABLE "post" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "title" varchar(100),
  "description" text,
  "status" text,
  "product_id" uuid,
  "expiration_date" timestamp,
  "created_at" timestamp,
  "updated_at" timestamp,
  "draft" bool
);

CREATE TABLE "product" (
  "id" uuid DEFAULT gen_random_uuid()  PRIMARY KEY,
  "name" text,
  "description" text,
  "required_stock" int,
  "unit_price" int,
  "create_at" timestamp,
  "update_at" timestamp,
  "url" text,
  "category_id" uuid
);

CREATE TABLE "image" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "fk_product" uuid,
  "url" text NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "stock" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "product_id" uuid,
  "stock_available" int
);

CREATE TABLE "user_post" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "role_id" uuid,
  "post_id" uuid,
  "user_id" uuid
);

CREATE TABLE "category" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "role" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "roles" VARCHAR(100) NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "order" (
  "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  "post_id" uuid,
  "order_date" timestamp,
  "status" varchar(100),
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "order_details" (
  "id" uuid DEFAULT gen_random_uuid()PRIMARY KEY,
  "order_id" uuid,
  "users_id" uuid,
  "stock_by_user" int
);

CREATE TABLE "region" (
  "id" int PRIMARY KEY,
  "region" text
);

CREATE TABLE "comuna" (
  "id" int PRIMARY KEY,
  "comuna" text,
  "region_id" int
);

ALTER TABLE "profile" ADD FOREIGN KEY ("fk_user") REFERENCES "user" ("id");

ALTER TABLE "profile" ADD FOREIGN KEY ("comuna_id") REFERENCES "comuna" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "image" ADD FOREIGN KEY ("fk_product") REFERENCES "product" ("id");

ALTER TABLE "stock" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "user_post" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "user_post" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");

ALTER TABLE "user_post" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_details" ADD FOREIGN KEY ("users_id") REFERENCES "user" ("id");

ALTER TABLE "comuna" ADD FOREIGN KEY ("region_id") REFERENCES "region" ("id");
