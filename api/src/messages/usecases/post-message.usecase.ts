import { Injectable, NotFoundException } from '@nestjs/common';
import { channel, direction, Message } from '../domain/entities/message.entiy';
import { MessageRepositoryInterface } from '../domain/repositories/message.repository';
import { ConversationRepositoryInterface } from 'src/conversation/domain/repositories/conversation.repository';
import { UserRepositoryInterface } from 'src/users/domain/repositories/user.repository';
import { UserId } from 'src/users/domain/entities/user.entity';
import { Conversation } from 'src/conversation/domain/entities/conversation.entity';

interface PostMessageDto {
  content: string;
  userId: string;
  channel: keyof typeof channel;
  direction: keyof typeof direction;
}

@Injectable()
export class PostMessageUseCase {
  constructor(
    private readonly messageRepository: MessageRepositoryInterface,
    private readonly conversationRepository: ConversationRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute({ content, direction, userId, channel }: PostMessageDto) {
    const _userId = new UserId(userId);
    const user = await this.userRepository.findById(_userId);
    const message = Message.create({ content, direction, channel });

    if (!user) {
      throw new NotFoundException('Esse usuário não existe no sistema');
    }

    let conversation = await this.conversationRepository.findByUserId(_userId);

    if (!conversation) {
      conversation = Conversation.create({
        status: 'OPEN',
        userId: _userId,
        messages: [],
      });

      await this.conversationRepository.create(conversation);
    }

    conversation.messages.push(message);

    await this.conversationRepository.save(conversation);

    return;
  }
}
