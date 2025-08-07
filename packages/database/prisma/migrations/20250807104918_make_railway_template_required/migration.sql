/*
  Warnings:

  - Made the column `railwayTemplateId` on table `games` required. This step will fail if there are existing NULL values in that column.

*/
-- Delete any games without a railwayTemplateId (they're test data anyway)
DELETE FROM "public"."game_servers" WHERE "gameId" IN (
  SELECT "id" FROM "public"."games" WHERE "railwayTemplateId" IS NULL
);
DELETE FROM "public"."games" WHERE "railwayTemplateId" IS NULL;

-- AlterTable
ALTER TABLE "public"."games" ALTER COLUMN "railwayTemplateId" SET NOT NULL;
