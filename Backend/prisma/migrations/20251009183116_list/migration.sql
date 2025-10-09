/*
  Warnings:

  - You are about to drop the column `columnId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `listId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Card" DROP CONSTRAINT "Card_columnId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Column" DROP CONSTRAINT "Column_boardId_fkey";

-- DropIndex
DROP INDEX "public"."Card_columnId_position_idx";

-- AlterTable
ALTER TABLE "public"."Card" DROP COLUMN "columnId",
ADD COLUMN     "listId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Column";

-- CreateTable
CREATE TABLE "public"."List" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "List_boardId_position_idx" ON "public"."List"("boardId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "List_boardId_title_key" ON "public"."List"("boardId", "title");

-- CreateIndex
CREATE INDEX "Card_listId_position_idx" ON "public"."Card"("listId", "position");

-- AddForeignKey
ALTER TABLE "public"."List" ADD CONSTRAINT "List_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_listId_fkey" FOREIGN KEY ("listId") REFERENCES "public"."List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
