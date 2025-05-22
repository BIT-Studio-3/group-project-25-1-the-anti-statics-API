/*
  Warnings:

  - Added the required column `teamId` to the `Disaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disaster" ADD COLUMN     "teamId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ResponseTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disasterId" TEXT NOT NULL,

    CONSTRAINT "ResponseTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMembership" (
    "id" TEXT NOT NULL,
    "responseTeamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponseTeam_disasterId_key" ON "ResponseTeam"("disasterId");

-- AddForeignKey
ALTER TABLE "ResponseTeam" ADD CONSTRAINT "ResponseTeam_disasterId_fkey" FOREIGN KEY ("disasterId") REFERENCES "Disaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembership" ADD CONSTRAINT "TeamMembership_responseTeamId_fkey" FOREIGN KEY ("responseTeamId") REFERENCES "ResponseTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembership" ADD CONSTRAINT "TeamMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
