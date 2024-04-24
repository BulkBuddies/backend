ALTER TABLE post ADD COLUMN visible boolean;
ALTER TABLE product ADD img_url text;

--trigger para profile
CREATE OR REPLACE FUNCTION insert_profile_after_user_insert()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "profile" ("id", "fk_user", "created_at", "updated_at")
    VALUES (gen_random_uuid(), NEW."id", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_profile_trigger
AFTER INSERT ON "usuario"
FOR EACH ROW
EXECUTE FUNCTION insert_profile_after_user_insert();

ALTER TABLE "profile"
ADD CONSTRAINT fk_user_id FOREIGN KEY ("fk_user") REFERENCES "usuario"("id") ON DELETE CASCADE;