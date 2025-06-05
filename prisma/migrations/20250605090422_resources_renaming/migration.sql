/*
  Warnings:

  - You are about to drop the `ResourcesAvailability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ResourcesAvailability";

-- CreateTable
CREATE TABLE "Resources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "assistance" TEXT NOT NULL,
    "conditions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);
