/*
  Warnings:

  - Added the required column `receivingDate` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "receivingDate" TIMESTAMP(3) NOT NULL;
