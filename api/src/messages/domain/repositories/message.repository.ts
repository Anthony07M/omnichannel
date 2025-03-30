import { RepositoryInterface } from 'src/shared/repositories/repository.interface';
import { Message, MessageId } from '../entities/message.entiy';

export interface MessageRepositoryInterface
  extends RepositoryInterface<Message, MessageId> {
  save(message: Message): Promise<void>;
  findById(messageId: MessageId): Promise<Message | null>;
}
