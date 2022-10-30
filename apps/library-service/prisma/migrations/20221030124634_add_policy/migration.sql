-- CreateTable
CREATE TABLE "Policy" (
    "minAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "cardReaderDuration" INTEGER NOT NULL,
    "bookDate" INTEGER NOT NULL,
    "maxBooks" INTEGER NOT NULL,
    "maxDate" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Policy_minAge_maxAge_cardReaderDuration_bookDate_maxBooks_m_key" ON "Policy"("minAge", "maxAge", "cardReaderDuration", "bookDate", "maxBooks", "maxDate");
