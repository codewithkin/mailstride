/*
  Warnings:

  - You are about to drop the column `publicationId` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `audience` on the `Publication` table. All the data in the column will be lost.
  - Added the required column `newsletterId` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_publicationId_fkey";

-- DropIndex
DROP INDEX "Email_publicationId_idx";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "publicationId",
ADD COLUMN     "newsletterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "audience";

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "EmailStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterAnalytics" (
    "id" TEXT NOT NULL,
    "totalEmails" INTEGER NOT NULL DEFAULT 0,
    "totalOpens" INTEGER NOT NULL DEFAULT 0,
    "uniqueOpens" INTEGER NOT NULL DEFAULT 0,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "uniqueClicks" INTEGER NOT NULL DEFAULT 0,
    "bounces" INTEGER NOT NULL DEFAULT 0,
    "unsubscribes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "newsletterId" TEXT NOT NULL,

    CONSTRAINT "NewsletterAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Newsletter_publicationId_idx" ON "Newsletter"("publicationId");

-- CreateIndex
CREATE INDEX "Newsletter_status_idx" ON "Newsletter"("status");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterAnalytics_newsletterId_key" ON "NewsletterAnalytics"("newsletterId");

-- CreateIndex
CREATE INDEX "NewsletterAnalytics_createdAt_idx" ON "NewsletterAnalytics"("createdAt");

-- CreateIndex
CREATE INDEX "Email_newsletterId_idx" ON "Email"("newsletterId");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Newsletter" ADD CONSTRAINT "Newsletter_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterAnalytics" ADD CONSTRAINT "NewsletterAnalytics_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
