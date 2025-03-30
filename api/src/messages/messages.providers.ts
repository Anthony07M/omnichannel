import { UserRepository } from 'src/users/infra/user.repository';
import { MessageRepositoryInterface } from './domain/repositories/message.repository';
import { MessageRepository } from './infra/message.repository';
import { PostMessageUseCase } from './usecases/post-message.usecase';
import { UserRepositoryInterface } from 'src/users/domain/repositories/user.repository';
import { ConversationRepositoryInterface } from 'src/conversation/domain/repositories/conversation.repository';
import { ConversationRepository } from 'src/conversation/infra/conversation.repository';

const REPOSITORIES = {
  MESSAGE_REPOSITORY: {
    provide: 'MessageRepository',
    useClass: MessageRepository,
  },
  CONVERSATION_REPOSITORY: {
    provide: 'ConversationRepository',
    useClass: ConversationRepository,
  },
  USER_REPOSITORY: {
    provide: 'UserRepository',
    useClass: UserRepository,
  },
};

const USE_CASES = {
  CREATE_USER_USE_CASE: {
    provide: PostMessageUseCase,
    useFactory: (
      messageRepository: MessageRepositoryInterface,
      conversationRepository: ConversationRepositoryInterface,
      userRepository: UserRepositoryInterface,
    ) => {
      return new PostMessageUseCase(
        messageRepository,
        conversationRepository,
        userRepository,
      );
    },
    inject: [
      REPOSITORIES.MESSAGE_REPOSITORY.provide,
      REPOSITORIES.CONVERSATION_REPOSITORY.provide,
      REPOSITORIES.USER_REPOSITORY.provide,
    ],
  },
};

export const USER_PROVIDERS = { REPOSITORIES, USE_CASES };
