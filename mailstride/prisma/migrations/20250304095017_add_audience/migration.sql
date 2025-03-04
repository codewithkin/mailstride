/*
  Warnings:

  - You are about to drop the column `delay` on the `AutomationEmail` table. All the data in the column will be lost.
  - You are about to drop the column `unsubscribes` on the `EmailAnalytics` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AudienceType" AS ENUM ('ALL_SUBSCRIBERS', 'MANUAL_LIST', 'CSV_IMPORT', 'SEGMENT');

-- DropIndex
DROP INDEX "Email_scheduledFor_idx";

-- DropIndex
DROP INDEX "Email_sentAt_idx";

-- DropIndex
DROP INDEX "EmailAnalytics_createdAt_idx";

-- AlterTable
ALTER TABLE "AutomationEmail" DROP COLUMN "delay";

-- AlterTable
ALTER TABLE "EmailAnalytics" DROP COLUMN "unsubscribes",
ADD COLUMN     "complaints" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "EmailAudience" (
    "id" TEXT NOT NULL,
    "type" "AudienceType" NOT NULL,
    "emailList" TEXT[],
    "segment" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailId" TEXT NOT NULL,

    CONSTRAINT "EmailAudience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailAudience_emailId_key" ON "EmailAudience"("emailId");

-- CreateIndex
CREATE INDEX "EmailAudience_type_idx" ON "EmailAudience"("type");

-- CreateIndex
CREATE INDEX "EmailAnalytics_emailId_idx" ON "EmailAnalytics"("emailId");

-- AddForeignKey
ALTER TABLE "EmailAudience" ADD CONSTRAINT "EmailAudience_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;
