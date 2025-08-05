/*
  Warnings:

  - You are about to drop the column `userId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title,createdBy]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[boardId,title]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `columnId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Board_position_key";

-- DropIndex
DROP INDEX "Board_title_key";

-- DropIndex
DROP INDEX "Column_position_key";

-- DropIndex
DROP INDEX "Column_title_key";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "userId",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "position" DROP DEFAULT;
DROP SEQUENCE "Board_position_seq";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "cardId",
ADD COLUMN     "columnId" INTEGER NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "position" DROP DEFAULT;
DROP SEQUENCE "Column_position_seq";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Board_User" (
    "userId" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedById" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "Board_User_userId_boardId_key" ON "Board_User"("userId", "boardId");

-- CreateIndex
CREATE UNIQUE INDEX "Board_title_createdBy_key" ON "Board"("title", "createdBy");

-- CreateIndex
CREATE INDEX "Card_columnId_position_idx" ON "Card"("columnId", "position");

-- CreateIndex
CREATE INDEX "Column_boardId_position_idx" ON "Column"("boardId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Column_boardId_title_key" ON "Column"("boardId", "title");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board_User" ADD CONSTRAINT "Board_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board_User" ADD CONSTRAINT "Board_User_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board_User" ADD CONSTRAINT "Board_User_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
