-- CreateEnum
CREATE TYPE "DisasterType" AS ENUM ('FLOOD', 'EARTHQUAKE', 'FIRE', 'CYCLONE', 'TSUNAMI', 'LANDSLIDE', 'VOLCANIC', 'OTHER');

-- CreateEnum
CREATE TYPE "DisasterStatus" AS ENUM ('ACTIVE', 'CONTAINED', 'RESOLVED');

-- CreateTable
CREATE TABLE "Disaster" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "DisasterType" NOT NULL,
    "location" JSONB NOT NULL,
    "description" TEXT,
    "status" "DisasterStatus" NOT NULL,
    "severity" TEXT NOT NULL,
    "controllerId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disaster_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Disaster" ADD CONSTRAINT "Disaster_controllerId_fkey" FOREIGN KEY ("controllerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
