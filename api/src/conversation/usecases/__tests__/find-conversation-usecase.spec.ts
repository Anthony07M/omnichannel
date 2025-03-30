import { ConversationRepositoryInterface } from 'src/conversation/domain/repositories/conversation.repository';
import { FindConversationUseCase } from '../find-conversation.usecase';
import { Message } from 'src/messages/domain/entities/message.entiy';
import { UserId } from 'src/users/domain/entities/user.entity';
import {
  Conversation,
  ConversationConstructorProps,
} from 'src/conversation/domain/entities/conversation.entity';

describe('FindConversationUseCase', () => {
  let conversationRepository: ConversationRepositoryInterface;
  const messages = [
    Message.create({
      direction: 'IN',
      channel: 'WEB',
      content: 'Lorem ipsum',
    }),
    Message.create({
      direction: 'OUT',
      channel: 'WEB',
      content: 'Lorem ipsum test',
    }),
  ];

  const conversationRepositorymock = {
    save: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByUserId: jest.fn(),
  };

  beforeEach(() => {
    conversationRepository = jest.mocked<ConversationRepositoryInterface>(
      conversationRepositorymock,
    );
  });

  it('should be found conversation success', async () => {
    const conversationProps: ConversationConstructorProps = {
      messages: messages,
      status: 'PENDING',
      userId: new UserId(),
    };

    const usecase = new FindConversationUseCase(conversationRepository);
    const conversationMock = Conversation.create(conversationProps);

    jest
      .spyOn(conversationRepository, 'findById')
      .mockResolvedValue(conversationMock);

    const conversation = await usecase.execute(conversationMock.id.toString());

    expect(conversation.status).toEqual(conversationProps.status);
    expect(conversation.userId).toEqual(conversationProps.userId.toString());
    expect(conversation.status).toEqual(conversationProps.status);

    expect(conversation.messages.length).toEqual(2);
    expect(conversation.messages.at(0)).toEqual({
      id: conversationProps.messages.at(0)?.id.toString(),
      channel: conversationProps.messages.at(0)?.channel,
      content: conversationProps.messages.at(0)?.content,
      direction: conversationProps.messages.at(0)?.direction,
      createdAt: conversationProps.messages.at(0)?.createdAt,
      updatedAt: conversationProps.messages.at(0)?.updatedAt,
    });
    expect(conversation.messages.at(1)).toEqual({
      id: conversationProps.messages.at(1)?.id.toString(),
      channel: conversationProps.messages.at(1)?.channel,
      content: conversationProps.messages.at(1)?.content,
      direction: conversationProps.messages.at(1)?.direction,
      createdAt: conversationProps.messages.at(1)?.createdAt,
      updatedAt: conversationProps.messages.at(1)?.updatedAt,
    });
  });

  it('should be throw error Conversation not found', () => {
    const conversationId = '0195e843-9971-74ce-81c2-88e97c36daa8';
    const usecase = new FindConversationUseCase(conversationRepository);

    jest.spyOn(conversationRepository, 'findById').mockReset();

    void expect(async () => {
      await usecase.execute(conversationId);
    }).rejects.toThrow('Conversa não encontrada');
  });

  it('should be called use case with corrects params', async () => {
    const conversationProps: ConversationConstructorProps = {
      messages: messages,
      status: 'PENDING',
      userId: new UserId(),
    };

    const usecase = new FindConversationUseCase(conversationRepository);
    const conversationMock = Conversation.create(conversationProps);

    const executeSpy = jest.spyOn(usecase, 'execute');
    const findByIdSpy = jest
      .spyOn(conversationRepository, 'findById')
      .mockResolvedValue(conversationMock);

    await usecase.execute(conversationMock.id.toString());

    expect(executeSpy).toHaveBeenCalledWith(conversationMock.id.toString());
    expect(findByIdSpy).toHaveBeenCalledWith(conversationMock.id);
  });
});
