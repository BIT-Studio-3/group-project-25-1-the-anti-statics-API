/*
  Warnings:

  - You are about to drop the column `affectedAreas` on the `Hazard` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `Hazard` table. All the data in the column will be lost.
  - Added the required column `city` to the `Hazard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Hazard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hazard" DROP COLUMN "affectedAreas",
DROP COLUMN "severity",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL;
