/*
  Warnings:

  - You are about to drop the column `authorId` on the `Manga` table. All the data in the column will be lost.
  - Added the required column `author` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_authorId_fkey";

-- AlterTable
ALTER TABLE "Manga" DROP COLUMN "authorId",
ADD COLUMN     "author" TEXT NOT NULL;
