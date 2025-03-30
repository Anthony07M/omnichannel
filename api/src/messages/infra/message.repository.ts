import { PrismaService } from 'src/prisma/prisma.service';
import { Message, MessageId } from '../domain/entities/message.entiy';
import { MessageRepositoryInterface } from '../domain/repositories/message.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageRepository implements MessageRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async save(message: Message): Promise<void> {
    await this.prismaService.message.create({
      data: {
        id: message.id.toString(),
        channel: message.channel,
        content: message.content,
        createdAt: message.createdAt,
        direction: message.direction,
        updatedAt: message.updatedAt,
      },
    });
  }

  async findById(messageId: MessageId): Promise<Message | null> {
    const message = await this.prismaService.message.findUnique({
      where: {
        id: messageId.toString(),
      },
    });

    if (!message) {
      return null;
    }

    return Message.create({
      id: new MessageId(message.id),
      channel: message.channel,
      content: message.content,
      createdAt: message.createdAt,
      direction: message.direction,
      updatedAt: message.updatedAt,
    });
  }
}
