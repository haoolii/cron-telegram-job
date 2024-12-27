/*
  Warnings:

  - You are about to drop the `ApplicationBucket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApplicationBucket";

-- CreateTable
CREATE TABLE "BucketApplication" (
    "applicationId" TEXT NOT NULL,
    "bucketId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BucketApplication_pkey" PRIMARY KEY ("applicationId","bucketId")
);
