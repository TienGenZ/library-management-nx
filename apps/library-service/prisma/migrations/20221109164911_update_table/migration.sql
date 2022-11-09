/*
  Warnings:

  - Added the required column `deletedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `publishedAt` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `deletedAt` to the `BookType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BookType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `Publisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Publisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `Reader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedAt` to the `ReaderToBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ReaderToBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "publishedAt",
ADD COLUMN     "publishedAt" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BookType" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reader" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReaderToBook" ADD COLUMN     "deletedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
