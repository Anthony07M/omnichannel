import { Module } from '@nestjs/common';
import { UsersController } from './application/users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_PROVIDERS } from './users.providers';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class UsersModule {}
