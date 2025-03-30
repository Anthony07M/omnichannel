import { Uuid } from 'src/shared/value-objects/uuid.vo';

export class MessageId extends Uuid {}
export const channel = {
  SMS: 'SMS',
  WEB: 'WEB',
};
export const direction = {
  IN: 'IN',
  OUT: 'OUT',
};

export interface MessageConstructorProps {
  id?: MessageId;
  content: string;
  channel: keyof typeof channel;
  direction: keyof typeof direction;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Message {
  id: MessageId;
  content: string;
  channel: keyof typeof channel;
  direction: keyof typeof direction;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    channel,
    content,
    direction,
    createdAt,
    updatedAt,
  }: MessageConstructorProps) {
    this.id = id || new MessageId();
    this.content = content;
    this.channel = channel;
    this.direction = direction;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  static create(props: MessageConstructorProps): Message {
    return new Message(props);
  }
}
