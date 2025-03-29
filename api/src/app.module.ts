import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConversationModule } from './conversation/conversation.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, ConversationModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
