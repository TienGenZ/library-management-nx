/*
  Warnings:

  - A unique constraint covering the columns `[name,dob]` on the table `Reader` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `expiredAt` on the `Reader` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Policy_minAge_maxAge_cardReaderDuration_bookDate_maxBooks_m_key";

-- AlterTable
ALTER TABLE "Reader" DROP COLUMN "expiredAt",
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reader_name_dob_key" ON "Reader"("name", "dob");
