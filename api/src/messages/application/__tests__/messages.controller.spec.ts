import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../messages.controller';
import { PostMessageUseCase } from '../../usecases/post-message.usecase';
import { PostMessageDto } from '../dto/post-message.dto';

describe('MessagesController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: PostMessageUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be post message success', async () => {
    const postMessageDto: PostMessageDto = {
      userId: '0195e843-9971-74ce-81c2-88e97c36daa8',
      channel: 'WEB',
      content: 'lorem ipusum',
      direction: 'IN',
    };

    const postMessageSpy = jest.spyOn(controller, 'sendMessage');
    const executeSpy = jest.spyOn(controller['postMessageUseCase'], 'execute');

    await controller.sendMessage(postMessageDto);

    expect(postMessageSpy).toHaveBeenCalledWith(postMessageDto);
    expect(executeSpy).toHaveBeenCalledWith(postMessageDto);
  });
});
