/*
  Warnings:

  - You are about to drop the column `username` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_username_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "username",
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userName_key" ON "Customer"("userName");
