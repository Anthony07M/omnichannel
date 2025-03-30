import { MessageRepositoryInterface } from 'src/messages/domain/repositories/message.repository';
import { PostMessageUseCase } from '../post-message.usecase';
import { UserRepositoryInterface } from 'src/users/domain/repositories/user.repository';
import { ConversationRepositoryInterface } from 'src/conversation/domain/repositories/conversation.repository';
import { PostMessageDto } from 'src/messages/application/dto/post-message.dto';
import { User, UserId } from 'src/users/domain/entities/user.entity';
import { Address } from 'src/shared/value-objects/address.vo';

describe('PostMessageUseCase', () => {
  let messageRepository: MessageRepositoryInterface;
  let userRepository: UserRepositoryInterface;
  let conversationRepository: ConversationRepositoryInterface;
  const MessageRepositorymock = {
    save: jest.fn(),
    findById: jest.fn(),
  };

  const userRepositorymock = {
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
  };

  const conversationRepositorymock = {
    save: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByUserId: jest.fn(),
  };

  beforeEach(() => {
    messageRepository = jest.mocked<MessageRepositoryInterface>(
      MessageRepositorymock,
    );
    userRepository = jest.mocked<UserRepositoryInterface>(userRepositorymock);
    conversationRepository = jest.mocked<ConversationRepositoryInterface>(
      conversationRepositorymock,
    );
  });

  it('should be post message success', async () => {
    const useCase = new PostMessageUseCase(
      messageRepository,
      conversationRepository,
      userRepository,
    );

    const user = User.create({
      id: new UserId('0195e843-9971-74ce-81c2-88e97c36daa8'),
      name: 'Jonh Doe',
      email: 'jonh@mail.com',
      address: Address.create({
        cep: '69018-660',
        logradouro: 'Rua Macacaúba',
        complemento: '(Res V Melhor - 2ª Etapa)',
        bairro: 'Lago Azul',
        localidade: 'Manaus',
        uf: 'AM',
        estado: 'Amazonas',
        regiao: 'Norte',
      }),
    });

    const postMessageDto: PostMessageDto = {
      channel: 'SMS',
      content: 'lorem ipsum',
      direction: 'IN',
      userId: user.id.toString(),
    };

    const executeSpy = jest.spyOn(useCase, 'execute');
    const findByUserIdSpy = jest
      .spyOn(userRepository, 'findById')
      .mockResolvedValue(user);

    await useCase.execute(postMessageDto);

    expect(executeSpy).toHaveBeenCalledWith(postMessageDto);
    expect(findByUserIdSpy).toHaveBeenCalledWith(user.id);
  });

  it('should be throw Error user not found', () => {
    const useCase = new PostMessageUseCase(
      messageRepository,
      conversationRepository,
      userRepository,
    );

    const postMessageDto: PostMessageDto = {
      channel: 'SMS',
      content: 'lorem ipsum',
      direction: 'IN',
      userId: '0195e843-9971-74ce-81c2-88e97c36daa8',
    };

    jest.spyOn(userRepository, 'findById').mockReset();

    void expect(async () => {
      await useCase.execute(postMessageDto);
    }).rejects.toThrow('Esse usuário não existe no sistema');
  });
});
