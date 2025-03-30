import { Module } from '@nestjs/common';
import { MessagesController } from './application/messages.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_PROVIDERS } from './messages.providers';

@Module({
  controllers: [MessagesController],
  providers: [
    PrismaService,
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class MessagesModule {}
