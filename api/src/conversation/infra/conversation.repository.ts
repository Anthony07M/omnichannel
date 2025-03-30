import { PrismaService } from 'src/prisma/prisma.service';
import {
  Conversation,
  ConversationId,
} from '../domain/entities/conversation.entity';
import { ConversationRepositoryInterface } from '../domain/repositories/conversation.repository';
import { Message, MessageId } from 'src/messages/domain/entities/message.entiy';
import { UserId } from 'src/users/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationRepository implements ConversationRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async create(conversation: Conversation): Promise<void> {
    await this.prismaService.conversation.create({
      data: {
        id: conversation.id.toString(),
        status: conversation.status,
        userId: conversation.userId.toString(),
      },
    });
  }

  async save(conversation: Conversation): Promise<void> {
    const existingMessageIds = await this.prismaService.message.findMany({
      where: { conversationId: conversation.id.toString() },
      select: { id: true },
    });

    const newMessages = conversation.messages.filter((msg) => {
      const foundMessage = existingMessageIds.find(
        (msgItem) => msgItem.id === msg.id.toString(),
      );

      return foundMessage === undefined;
    });

    await this.prismaService.conversation.update({
      where: { id: conversation.id.toString() },
      data: {
        status: conversation.status,
        messages: {
          createMany: {
            data: newMessages.map((msg) => ({
              id: msg.id.toString(),
              channel: msg.channel,
              content: msg.content,
              createdAt: msg.createdAt,
              direction: msg.direction,
              updatedAt: msg.updatedAt,
            })),
          },
        },
      },
    });
  }

  async findById(conversationId: ConversationId): Promise<Conversation | null> {
    const conversation = await this.prismaService.conversation.findUnique({
      where: { id: conversationId.toString() },
      include: { messages: true },
    });

    if (!conversation) {
      return null;
    }

    return Conversation.create({
      id: new ConversationId(conversation?.id),
      status: conversation.status,
      userId: new UserId(conversation.userId),
      messages:
        conversation.messages?.map((msg) =>
          Message.create({
            id: new MessageId(msg.id),
            channel: msg.channel,
            content: msg.content,
            direction: msg.direction,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt,
          }),
        ) || [],
    });
  }

  async findByUserId(userId: UserId): Promise<Conversation | null> {
    const conversation = await this.prismaService.conversation.findFirst({
      where: { userId: userId.toString() },
      include: { messages: true },
    });

    if (!conversation) {
      return null;
    }

    return Conversation.create({
      id: new ConversationId(conversation?.id),
      status: conversation.status,
      userId: new UserId(conversation.userId),
      messages:
        conversation.messages?.map((msg) =>
          Message.create({
            id: new MessageId(msg.id),
            channel: msg.channel,
            content: msg.content,
            direction: msg.direction,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt,
          }),
        ) || [],
    });
  }
}
