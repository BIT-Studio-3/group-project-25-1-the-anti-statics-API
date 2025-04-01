/*
  Warnings:

  - Added the required column `location` to the `Hazard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hazard" ADD COLUMN     "location" TEXT NOT NULL;
