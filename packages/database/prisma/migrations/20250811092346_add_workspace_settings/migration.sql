/*
  Warnings:

  - You are about to drop the column `domain` on the `game_server_connections` table. All the data in the column will be lost.
  - You are about to drop the column `railwayProjectId` on the `game_servers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."game_server_connections_domain_key";

-- AlterTable
ALTER TABLE "public"."game_server_connections" DROP COLUMN "domain";

-- AlterTable
ALTER TABLE "public"."game_servers" DROP COLUMN "railwayProjectId";

-- CreateTable
CREATE TABLE "public"."workspace_settings" (
    "id" TEXT NOT NULL DEFAULT 'workspace_settings',
    "registrationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_settings_pkey" PRIMARY KEY ("id")
);
