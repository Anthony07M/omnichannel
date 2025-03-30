import { Test, TestingModule } from '@nestjs/testing';
import { ConversationController } from '../conversation.controller';
import { FindConversationUseCase } from '../../usecases/find-conversation.usecase';

describe('ConversationController', () => {
  let controller: ConversationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [
        {
          provide: FindConversationUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConversationController>(ConversationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be found conversation success', async () => {
    const conversationId: string = '0195e843-9971-74ce-81c2-88e97c36daa8';
    jest
      .spyOn(controller['findConversationUseCase'], 'execute')
      .mockReturnValue(
        Promise.resolve({
          id: conversationId,
          userId: '0195e843-9971-74ce-81c2-88e97c36daa8',
          status: 'OPEN',
          messages: [
            {
              id: '0195e843-9971-74ce-81c2-88e97c36daa8',
              channel: 'WEB',
              content: 'lorem ipsum',
              direction: 'IN',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        }),
      );
    const conversation = await controller.getConversation(conversationId);

    expect(conversation.id).toEqual(expect.any(String));
    expect(conversation.userId).toEqual(expect.any(String));
    expect(conversation.status).toEqual('OPEN');
    expect(conversation.messages.length).toEqual(1);
    expect(conversation.messages.length).toEqual(1);
    expect(conversation.messages.at(0)?.id).toEqual(expect.any(String));
    expect(conversation.messages.at(0)?.channel).toEqual('WEB');
    expect(conversation.messages.at(0)?.content).toEqual('lorem ipsum');
    expect(conversation.messages.at(0)?.direction).toEqual('IN');
    expect(conversation.messages.at(0)?.createdAt).toBeInstanceOf(Date);
    expect(conversation.messages.at(0)?.updatedAt).toBeInstanceOf(Date);
  });

  it('should be called correts params', async () => {
    const conversationId: string = 'conversationId';

    const executeSpy = jest.spyOn(
      controller['findConversationUseCase'],
      'execute',
    );
    const controllerSpy = jest.spyOn(controller, 'getConversation');

    await controller.getConversation(conversationId);

    expect(executeSpy).toHaveBeenCalledWith(conversationId);
    expect(controllerSpy).toHaveBeenCalledWith(conversationId);
  });
});
