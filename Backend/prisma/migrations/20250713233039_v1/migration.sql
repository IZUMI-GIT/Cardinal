/*
  Warnings:

  - You are about to drop the `List` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_cardId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_boardId_fkey";

-- DropIndex
DROP INDEX "Board_userId_key";

-- DropIndex
DROP INDEX "Card_cardId_key";

-- DropIndex
DROP INDEX "Card_position_key";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "position" DROP DEFAULT,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Card_position_seq";

-- DropTable
DROP TABLE "List";

-- CreateTable
CREATE TABLE "Column" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,
    "position" SERIAL NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Column_title_key" ON "Column"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Column_position_key" ON "Column"("position");

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
