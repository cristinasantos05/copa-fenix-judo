/*
  Warnings:

  - You are about to drop the column `bracketid` on the `LineUp` table. All the data in the column will be lost.
  - Added the required column `bracketId` to the `LineUp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LineUp" DROP CONSTRAINT "LineUp_bracketid_fkey";

-- AlterTable
ALTER TABLE "LineUp" DROP COLUMN "bracketid",
ADD COLUMN     "bracketId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LineUp" ADD CONSTRAINT "LineUp_bracketId_fkey" FOREIGN KEY ("bracketId") REFERENCES "Bracket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
