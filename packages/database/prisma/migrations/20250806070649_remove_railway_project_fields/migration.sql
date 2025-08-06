/*
  Warnings:

  - You are about to drop the column `environmentId` on the `railway` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `railway` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."railway" DROP COLUMN "environmentId",
DROP COLUMN "projectId";
