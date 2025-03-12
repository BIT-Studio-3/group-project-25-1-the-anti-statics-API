-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emergencyType" TEXT NOT NULL,
    "alertLevel" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);
