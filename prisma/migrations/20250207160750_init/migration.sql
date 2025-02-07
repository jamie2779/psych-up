-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "TrainingStatus" AS ENUM ('ACTIVE', 'COMPLETE', 'FAIL');

-- CreateEnum
CREATE TYPE "MailStatus" AS ENUM ('DEFAULT', 'DELETED');

-- CreateTable
CREATE TABLE "Todo" (
    "todoId" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "target" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedDate" TIMESTAMP(3),
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todoId")
);

-- CreateTable
CREATE TABLE "User" (
    "memerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profileImg" TEXT,
    "permission" "Permission" NOT NULL DEFAULT 'user',
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("memerId")
);

-- CreateTable
CREATE TABLE "Training" (
    "trainingId" SERIAL NOT NULL,
    "memerId" INTEGER NOT NULL,
    "scenarioId" INTEGER NOT NULL,
    "status" "TrainingStatus" NOT NULL DEFAULT 'ACTIVE',
    "limitDate" TIMESTAMP(3) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "score" INTEGER,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("trainingId")
);

-- CreateTable
CREATE TABLE "MailHolder" (
    "mailHolderId" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "mailId" INTEGER NOT NULL,

    CONSTRAINT "MailHolder_pkey" PRIMARY KEY ("mailHolderId")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "scenarioId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "files" JSONB NOT NULL,
    "todoTemplate" JSONB NOT NULL,
    "mailTemplate" JSONB NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("scenarioId")
);

-- CreateTable
CREATE TABLE "Mail" (
    "mailId" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "files" JSONB NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isDownloaded" BOOLEAN NOT NULL DEFAULT false,
    "status" "MailStatus" NOT NULL DEFAULT 'DEFAULT',
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("mailId")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("trainingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_memerId_fkey" FOREIGN KEY ("memerId") REFERENCES "User"("memerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("scenarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MailHolder" ADD CONSTRAINT "MailHolder_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("trainingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MailHolder" ADD CONSTRAINT "MailHolder_mailId_fkey" FOREIGN KEY ("mailId") REFERENCES "Mail"("mailId") ON DELETE RESTRICT ON UPDATE CASCADE;
