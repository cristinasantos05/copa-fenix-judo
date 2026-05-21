/*
  Warnings:

  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Cup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudoClub" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JudoClub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Athlete" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bracket" (
    "id" SERIAL NOT NULL,
    "cupId" INTEGER NOT NULL,

    CONSTRAINT "Bracket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineUp" (
    "id" SERIAL NOT NULL,
    "bracketid" INTEGER NOT NULL,

    CONSTRAINT "LineUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CupToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CupToTeam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CupToJudoClub" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CupToJudoClub_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AthleteToLineUp" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AthleteToLineUp_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BracketToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BracketToTeam_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CupToTeam_B_index" ON "_CupToTeam"("B");

-- CreateIndex
CREATE INDEX "_CupToJudoClub_B_index" ON "_CupToJudoClub"("B");

-- CreateIndex
CREATE INDEX "_AthleteToLineUp_B_index" ON "_AthleteToLineUp"("B");

-- CreateIndex
CREATE INDEX "_BracketToTeam_B_index" ON "_BracketToTeam"("B");

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bracket" ADD CONSTRAINT "Bracket_cupId_fkey" FOREIGN KEY ("cupId") REFERENCES "Cup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineUp" ADD CONSTRAINT "LineUp_bracketid_fkey" FOREIGN KEY ("bracketid") REFERENCES "Bracket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CupToTeam" ADD CONSTRAINT "_CupToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Cup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CupToTeam" ADD CONSTRAINT "_CupToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CupToJudoClub" ADD CONSTRAINT "_CupToJudoClub_A_fkey" FOREIGN KEY ("A") REFERENCES "Cup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CupToJudoClub" ADD CONSTRAINT "_CupToJudoClub_B_fkey" FOREIGN KEY ("B") REFERENCES "JudoClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AthleteToLineUp" ADD CONSTRAINT "_AthleteToLineUp_A_fkey" FOREIGN KEY ("A") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AthleteToLineUp" ADD CONSTRAINT "_AthleteToLineUp_B_fkey" FOREIGN KEY ("B") REFERENCES "LineUp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BracketToTeam" ADD CONSTRAINT "_BracketToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Bracket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BracketToTeam" ADD CONSTRAINT "_BracketToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
