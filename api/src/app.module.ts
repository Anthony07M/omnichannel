import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConversationModule } from './conversation/conversation.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, ConversationModule, PrismaModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
