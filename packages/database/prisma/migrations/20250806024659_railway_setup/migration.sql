/*
  Warnings:

  - You are about to drop the column `projectToken` on the `railway` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `railway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environmentId` to the `railway` table without a default value. This is not possible if the table is not empty.
  - Made the column `projectId` on table `railway` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."railway" DROP COLUMN "projectToken",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "environmentId" TEXT NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;
