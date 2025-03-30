import { ConversationRepositoryInterface } from './domain/repositories/conversation.repository';
import { ConversationRepository } from './infra/conversation.repository';
import { FindConversationUseCase } from './usecases/find-conversation.usecase';

const REPOSITORIES = {
  CONVERSATION_REPOSITORY: {
    provide: 'ConversationRepository',
    useClass: ConversationRepository,
  },
};

const USE_CASES = {
  FIND_CONVERSATION_USE_CASE: {
    provide: FindConversationUseCase,
    useFactory: (conversationRepository: ConversationRepositoryInterface) => {
      return new FindConversationUseCase(conversationRepository);
    },
    inject: [REPOSITORIES.CONVERSATION_REPOSITORY.provide],
  },
};

export const CONVERSATION_PROVIDERS = { REPOSITORIES, USE_CASES };
