import { RepositoryInterface } from 'src/shared/repositories/repository.interface';
import { Conversation, ConversationId } from '../entities/conversation.entity';
import { UserId } from 'src/users/domain/entities/user.entity';

export interface ConversationRepositoryInterface
  extends RepositoryInterface<Conversation, ConversationId> {
  save(conversation: Conversation): Promise<void>;
  create(conversation: Conversation): Promise<void>;
  findById(conversationId: ConversationId): Promise<Conversation | null>;
  findByUserId(userId: UserId): Promise<Conversation | null>;
}
