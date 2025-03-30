import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FindConversationUseCase } from '../usecases/find-conversation.usecase';

@Controller('conversation')
export class ConversationController {
  @Inject(FindConversationUseCase)
  findConversationUseCase: FindConversationUseCase;

  @Get('/:conversationId')
  async getConversation(@Param('conversationId') conversationId: string) {
    return await this.findConversationUseCase.execute(conversationId);
  }
}
