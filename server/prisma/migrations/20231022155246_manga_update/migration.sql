/*
  Warnings:

  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `score` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_mangaId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Manga" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "Chapter";
