/*
  Warnings:

  - Changed the type of `severity` on the `Disaster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DisasterSeverity" AS ENUM ('LOW', 'MODERATE', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Disaster" DROP COLUMN "severity",
ADD COLUMN     "severity" "DisasterSeverity" NOT NULL;
