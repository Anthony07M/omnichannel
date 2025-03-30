import { Message } from 'src/messages/domain/entities/message.entiy';
import { Uuid } from 'src/shared/value-objects/uuid.vo';
import { UserId } from 'src/users/domain/entities/user.entity';

export class ConversationId extends Uuid {}

export const status = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  PENDING: 'PENDING',
};

export class ConversationConstructorProps {
  id?: ConversationId;
  userId: UserId;
  status: keyof typeof status;
  messages: Message[];
}

export class Conversation {
  id: ConversationId;
  userId: UserId;
  status: keyof typeof status;
  messages: Message[];

  constructor({ id, userId, messages, status }: ConversationConstructorProps) {
    this.id = id || new ConversationId();
    this.userId = userId;
    this.messages = messages;
    this.status = status;
  }

  static create(props: ConversationConstructorProps): Conversation {
    return new Conversation(props);
  }
}
