-- AlterTable
ALTER TABLE "Policy" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Policy_pkey" PRIMARY KEY ("id");
