-- CreateTable
CREATE TABLE "AgeGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ethnicity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Disability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "diversity_responses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ageGroupId" INTEGER NOT NULL,
    "genderId" INTEGER NOT NULL,
    "ethnicityId" INTEGER NOT NULL,
    "lgbtqia" BOOLEAN NOT NULL,
    "parent" BOOLEAN NOT NULL,
    "disabilityId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isInternalResponse" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "diversity_responses_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "AgeGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "diversity_responses_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "diversity_responses_ethnicityId_fkey" FOREIGN KEY ("ethnicityId") REFERENCES "Ethnicity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "diversity_responses_disabilityId_fkey" FOREIGN KEY ("disabilityId") REFERENCES "Disability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AgeGroup_code_key" ON "AgeGroup"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_code_key" ON "Gender"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Ethnicity_code_key" ON "Ethnicity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Disability_code_key" ON "Disability"("code");
