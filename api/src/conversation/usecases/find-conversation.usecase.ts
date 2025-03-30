import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRepositoryInterface } from '../domain/repositories/conversation.repository';
import { ConversationId } from '../domain/entities/conversation.entity';

@Injectable()
export class FindConversationUseCase {
  constructor(
    private readonly conversationRepository: ConversationRepositoryInterface,
  ) {}

  async execute(conversationId: string) {
    const _conversationId = new ConversationId(conversationId);

    const conversation =
      await this.conversationRepository.findById(_conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversa não encontrada');
    }

    return {
      id: conversation.id.toString(),
      userId: conversation.userId.toString(),
      status: conversation.status,
      messages: conversation.messages.map((msg) => ({
        id: msg.id.toString(),
        channel: msg.channel,
        content: msg.content,
        direction: msg.direction,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
      })),
    };
  }
}
