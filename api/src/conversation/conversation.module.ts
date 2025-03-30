import { Module } from '@nestjs/common';
import { ConversationController } from './application/conversation.controller';
import { CONVERSATION_PROVIDERS } from './conversations.providers';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ConversationController],
  providers: [
    PrismaService,
    ...Object.values(CONVERSATION_PROVIDERS.REPOSITORIES),
    ...Object.values(CONVERSATION_PROVIDERS.USE_CASES),
  ],
})
export class ConversationModule {}
