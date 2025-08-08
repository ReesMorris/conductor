/*
  Warnings:

  - You are about to drop the column `proxyPort` on the `game_servers` table. All the data in the column will be lost.
  - You are about to drop the column `targetHost` on the `game_servers` table. All the data in the column will be lost.
  - Added the required column `internalHost` to the `game_servers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetPort` to the `game_servers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."game_servers_proxyPort_key";

-- AlterTable
ALTER TABLE "public"."game_servers" DROP COLUMN "proxyPort",
DROP COLUMN "targetHost",
ADD COLUMN     "internalHost" TEXT NOT NULL,
ADD COLUMN     "targetPort" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."game_server_connections" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "domain" TEXT,
    "subdomain" TEXT,
    "proxyPort" INTEGER NOT NULL,
    "name" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_server_connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "game_server_connections_serverId_idx" ON "public"."game_server_connections"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "game_server_connections_domain_subdomain_proxyPort_key" ON "public"."game_server_connections"("domain", "subdomain", "proxyPort");

-- AddForeignKey
ALTER TABLE "public"."game_server_connections" ADD CONSTRAINT "game_server_connections_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "public"."game_servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
