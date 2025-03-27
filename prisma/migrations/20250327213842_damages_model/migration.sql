-- CreateTable
CREATE TABLE "Damage" (
    "id" TEXT NOT NULL,
    "reporterName" TEXT NOT NULL,
    "damageType" TEXT NOT NULL,
    "damageLevel" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "countAffected" INTEGER NOT NULL,
    "cause" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Damage_pkey" PRIMARY KEY ("id")
);
