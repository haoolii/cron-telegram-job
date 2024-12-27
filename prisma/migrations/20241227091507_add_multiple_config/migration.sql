/*
  Warnings:

  - You are about to drop the column `configId` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "configId";

-- CreateTable
CREATE TABLE "ApplicationConfig" (
    "applicationId" TEXT NOT NULL,
    "configId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationConfig_pkey" PRIMARY KEY ("applicationId","configId")
);
