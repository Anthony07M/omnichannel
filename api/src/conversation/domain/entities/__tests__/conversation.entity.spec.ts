import { UserId } from 'src/users/domain/entities/user.entity';
import {
  Conversation,
  ConversationConstructorProps,
  ConversationId,
} from '../conversation.entity';
import { Message } from '../message.entiy';

describe('Unit test Conversation', () => {
  let messages: Message[];

  beforeEach(() => {
    messages = [
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
  });

  it('should be create conversation success', () => {
    const conversationProps: ConversationConstructorProps = {
      messages: messages,
      status: 'PENDING',
      userId: new UserId(),
    };

    const conversation = Conversation.create(conversationProps);

    expect(conversation).toBeInstanceOf(Conversation);
    expect(conversation.id).toBeInstanceOf(ConversationId);
    expect(conversation.messages.length).toEqual(2);
    expect(conversation.messages.at(0)).toEqual(messages.at(0));
    expect(conversation.messages.at(1)).toEqual(messages.at(1));
    expect(conversation.status).toEqual(conversationProps.status);
  });

  it('should be create conversation success with status CLOSED', () => {
    const conversationProps: ConversationConstructorProps = {
      messages: messages,
      status: 'CLOSED',
      userId: new UserId(),
    };

    const conversation = Conversation.create(conversationProps);

    expect(conversation).toBeInstanceOf(Conversation);
    expect(conversation.id).toBeInstanceOf(ConversationId);
    expect(conversation.messages.length).toEqual(2);
    expect(conversation.messages.at(0)).toEqual(messages.at(0));
    expect(conversation.messages.at(1)).toEqual(messages.at(1));
    expect(conversation.status).toEqual(conversationProps.status);
  });

  it('should be create conversation success with status PENDING', () => {
    const conversationProps: ConversationConstructorProps = {
      messages: messages,
      status: 'PENDING',
      userId: new UserId(),
    };

    const conversation = Conversation.create(conversationProps);

    expect(conversation).toBeInstanceOf(Conversation);
    expect(conversation.id).toBeInstanceOf(ConversationId);
    expect(conversation.messages.length).toEqual(2);
    expect(conversation.messages.at(0)).toEqual(messages.at(0));
    expect(conversation.messages.at(1)).toEqual(messages.at(1));
    expect(conversation.status).toEqual(conversationProps.status);
  });
});
