/*
  Warnings:

  - You are about to drop the column `userId` on the `Publication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Publication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PublicationRole" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');

-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_userId_fkey";

-- DropIndex
DROP INDEX "Publication_userId_idx";

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "userId",
ADD COLUMN     "audience" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PublicationMember" (
    "id" TEXT NOT NULL,
    "role" "PublicationRole" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "PublicationMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PublicationMember_userId_idx" ON "PublicationMember"("userId");

-- CreateIndex
CREATE INDEX "PublicationMember_publicationId_idx" ON "PublicationMember"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationMember_userId_publicationId_key" ON "PublicationMember"("userId", "publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_slug_key" ON "Publication"("slug");

-- CreateIndex
CREATE INDEX "Publication_ownerId_idx" ON "Publication"("ownerId");

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationMember" ADD CONSTRAINT "PublicationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationMember" ADD CONSTRAINT "PublicationMember_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
