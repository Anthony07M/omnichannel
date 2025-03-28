import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [UsersModule, ConversationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
