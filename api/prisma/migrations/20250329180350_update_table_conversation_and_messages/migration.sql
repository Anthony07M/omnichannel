/*
  Warnings:

  - You are about to drop the column `messagesId` on the `conversations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_messagesId_fkey";

-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "messagesId";

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "conversationId" TEXT;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
