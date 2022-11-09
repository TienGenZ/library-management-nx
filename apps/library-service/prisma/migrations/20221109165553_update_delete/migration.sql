/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `BookType` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Publisher` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Reader` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `ReaderToBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "BookType" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Publisher" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reader" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ReaderToBook" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
