import { PrismaService } from 'src/prisma/prisma.service';
import { ConversationRepository } from '../conversation.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Conversation,
  ConversationId,
} from 'src/conversation/domain/entities/conversation.entity';
import { UserId } from 'src/users/domain/entities/user.entity';
import { Message } from 'src/messages/domain/entities/message.entiy';

describe('ConversationRepository', () => {
  let conversationRepository: ConversationRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationRepository,
        {
          provide: PrismaService,
          useValue: {
            conversation: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              findFirst: jest.fn(),
            },
            message: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    conversationRepository = module.get<ConversationRepository>(
      ConversationRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findById', () => {
    it('should be found success conversation', async () => {
      const messages: Message[] = [
        Message.create({
          id: new ConversationId('0195e843-9971-74ce-81c2-88e97c36daa8'),
          direction: 'IN',
          channel: 'WEB',
          content: 'Lorem ipsum',
        }),
      ];

      jest.spyOn(prismaService.conversation, 'findUnique').mockResolvedValue({
        id: '0195e843-9971-74ce-81c2-88e97c36daa8',
        status: 'CLOSED',
        userId: '0195e843-9971-74ce-81c2-88e97c36daa8',
      });

      jest.spyOn(conversationRepository, 'findById').mockResolvedValue({
        id: new ConversationId('0195e843-9971-74ce-81c2-88e97c36daa8'),
        status: 'CLOSED',
        userId: new UserId('0195e843-9971-74ce-81c2-88e97c36daa8'),
        messages: messages,
      });

      const conversation = await conversationRepository.findById(
        new ConversationId('0195e843-9971-74ce-81c2-88e97c36daa8'),
      );

      expect(conversation?.id.toString()).toEqual(
        '0195e843-9971-74ce-81c2-88e97c36daa8',
      );
      expect(conversation?.status).toEqual('CLOSED');
      expect(conversation?.userId.toString()).toEqual(
        '0195e843-9971-74ce-81c2-88e97c36daa8',
      );
      expect(conversation?.messages.at(0)).toEqual(messages.at(0));
      expect(conversation?.messages.length).toEqual(1);

      expect(conversation?.messages.length).toEqual(1);
      expect(conversation?.messages[0].id.toString()).toEqual(
        '0195e843-9971-74ce-81c2-88e97c36daa8',
      );
      expect(conversation?.messages[0].content).toEqual('Lorem ipsum');
      expect(conversation?.messages[0].id.toString()).toEqual(
        '0195e843-9971-74ce-81c2-88e97c36daa8',
      );
      expect(conversation?.messages[0].content).toEqual('Lorem ipsum');
    });

    it('should be not found conversation and return null', async () => {
      jest.spyOn(prismaService.conversation, 'findUnique').mockReset();

      const conversation = await conversationRepository.findById(
        new ConversationId('0195e843-9971-74ce-81c2-88e97c36daa8'),
      );

      expect(conversation).toBeNull();
    });
  });

  describe('findByUserId', () => {
    it('should be found conversation success', async () => {
      jest.spyOn(prismaService.conversation, 'findFirst').mockResolvedValue({
        id: '0195e843-9971-74ce-81c2-88e97c36daa8',
        status: 'OPEN',
        userId: '0195e843-9971-74ce-81c2-88e97c36daa8',
      });

      const conversation = await conversationRepository.findByUserId(
        new UserId('0195e843-9971-74ce-81c2-88e97c36daa8'),
      );

      expect(conversation?.id.toString()).toEqual(
        '0195e843-9971-74ce-81c2-88e97c36daa8',
      );
      expect(conversation?.status).toEqual('OPEN');
      expect(conversation?.userId.toString()).toEqual(
        '0195e843-9971-74ce-81c2-88e97c36daa8',
      );
      expect(conversation?.messages).toEqual([]);
      expect(conversation?.messages.length).toEqual(0);
    });

    it('should be throw error conversation not found and return null', async () => {
      jest.spyOn(prismaService.conversation, 'findFirst').mockReset();

      const conversation = await conversationRepository.findByUserId(
        new UserId('0195e843-9971-74ce-81c2-88e97c36daa8'),
      );

      expect(conversation).toBeNull();
    });
  });

  describe('save', () => {
    it('should be success save conversation', async () => {
      const messages = [
        Message.create({
          direction: 'IN',
          channel: 'WEB',
          content: 'Lorem ipsum',
        }),
      ];

      const conversation = Conversation.create({
        id: new ConversationId('0195e843-9971-74ce-81c2-88e97c36daa8'),
        status: 'PENDING',
        userId: new UserId('0195e843-9971-74ce-81c2-88e97c36daa8'),
        messages,
      });

      const findManySpy = jest
        .spyOn(prismaService.message, 'findMany')
        .mockResolvedValue([]);

      const updateSpy = jest.spyOn(prismaService.conversation, 'update');
      const saveSpy = jest.spyOn(conversationRepository, 'save');

      await conversationRepository.save(conversation);

      expect(findManySpy).toHaveBeenCalledWith({
        where: { conversationId: conversation.id.toString() },
        select: { id: true },
      });

      expect(updateSpy).toHaveBeenLastCalledWith({
        where: { id: conversation.id.toString() },
        data: {
          status: conversation.status,
          messages: {
            createMany: {
              data: messages.map((msg) => ({
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

      expect(saveSpy).toHaveBeenCalledWith(conversation);
    });
  });

  describe('create', () => {
    it('should be create conversation success', async () => {
      const conversation = Conversation.create({
        id: new ConversationId('0195e843-9971-74ce-81c2-88e97c36daa8'),
        status: 'PENDING',
        userId: new UserId('0195e843-9971-74ce-81c2-88e97c36daa8'),
        messages: [],
      });

      const createSpy = jest.spyOn(conversationRepository, 'create');
      await conversationRepository.create(conversation);

      expect(createSpy).toHaveBeenCalledWith(conversation);
    });
  });
});
