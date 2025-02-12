/*
  Warnings:

  - You are about to drop the column `memerId` on the `Training` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memerId` on the `User` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_memerId_fkey";

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "memerId",
ADD COLUMN     "memberId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "memerId",
ADD COLUMN     "memberId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("memberId");

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
