ALTER TABLE "User" ADD COLUMN "hashedPassword" TEXT;

-- Patch existing users with temporary password (you MUST delete this later)
UPDATE "User" SET "hashedPassword" = 'temp123' WHERE "hashedPassword" IS NULL;

ALTER TABLE "User" ALTER COLUMN "hashedPassword" SET NOT NULL;
