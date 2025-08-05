-- CreateTable
CREATE TABLE "public"."railway" (
    "id" TEXT NOT NULL DEFAULT 'railway_config',
    "projectToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "railway_pkey" PRIMARY KEY ("id")
);
