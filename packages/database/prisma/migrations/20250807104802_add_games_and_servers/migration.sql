-- CreateEnum
CREATE TYPE "public"."protocol" AS ENUM ('TCP', 'UDP');

-- CreateTable
CREATE TABLE "public"."games" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "defaultPort" INTEGER NOT NULL,
    "protocol" "public"."protocol" NOT NULL,
    "railwayTemplateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."game_servers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "proxyPort" INTEGER NOT NULL,
    "targetHost" TEXT NOT NULL,
    "railwayServiceId" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_servers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_servers_proxyPort_key" ON "public"."game_servers"("proxyPort");

-- AddForeignKey
ALTER TABLE "public"."game_servers" ADD CONSTRAINT "game_servers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
