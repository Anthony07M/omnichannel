import { Test, TestingModule } from '@nestjs/testing';
import { MessageRepository } from '../message.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message, MessageId } from 'src/messages/domain/entities/message.entiy';

describe('MessageRepository', () => {
  let messageRepository: MessageRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageRepository,
        {
          provide: PrismaService,
          useValue: {
            message: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    messageRepository = module.get<MessageRepository>(MessageRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be create message success', async () => {
    const message = Message.create({
      direction: 'IN',
      channel: 'WEB',
      content: 'Lorem ipsum',
    });

    const saveSpy = jest.spyOn(messageRepository, 'save');
    const createSpy = jest.spyOn(prismaService.message, 'create');

    await messageRepository.save(message);

    expect(saveSpy).toHaveBeenCalledWith(message);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        id: message.id.toString(),
        direction: message.direction,
        channel: message.channel,
        content: message.content,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      },
    });
  });

  it('should be found message by id success', async () => {
    const messageId = '0195e843-9971-74ce-81c2-88e97c36daa8';
    const createdAt = new Date();
    const updatedAt = new Date();

    const findUniqueSpy = jest
      .spyOn(prismaService.message, 'findUnique')
      .mockResolvedValue({
        id: messageId,
        channel: 'SMS',
        content: 'Hello world',
        direction: 'OUT',
        conversationId: '0195e843-9971-74ce-81c2-88e97c36daa8',
        createdAt,
        updatedAt,
      });

    const result = await messageRepository.findById(new MessageId(messageId));

    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: { id: messageId },
    });
    expect(result).toEqual(
      Message.create({
        id: new MessageId(messageId),
        channel: 'SMS',
        content: 'Hello world',
        direction: 'OUT',
        createdAt,
        updatedAt,
      }),
    );
  });

  it('should be return null when message not found', async () => {
    const messageId = new MessageId('0195e843-9971-74ce-81c2-88e97c36daa8');
    jest.spyOn(prismaService.message, 'findUnique').mockResolvedValue(null);
    const result = await messageRepository.findById(messageId);

    expect(result).toBeNull();
  });
});
