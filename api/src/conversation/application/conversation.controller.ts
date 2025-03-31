import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FindConversationUseCase } from '../usecases/find-conversation.usecase';

@Controller('conversation')
export class ConversationController {
  @Inject(FindConversationUseCase)
  findConversationUseCase: FindConversationUseCase;

  @Get('/:conversationId')
  async getConversation(
    @Param(
      'conversationId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('conversationId precisa ser um uuid válido'),
      }),
    )
    conversationId: string,
  ) {
    return await this.findConversationUseCase.execute(conversationId);
  }
}
