/*
  Warnings:

  - You are about to drop the column `internalHost` on the `game_servers` table. All the data in the column will be lost.
  - You are about to drop the column `targetPort` on the `game_servers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."game_servers" DROP COLUMN "internalHost",
DROP COLUMN "targetPort";
