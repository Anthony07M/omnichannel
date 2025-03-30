import {
  Message,
  MessageConstructorProps,
  MessageId,
} from '../entities/message.entiy';

describe('Message Unit Test', () => {
  it('should be create Message success with Direction IN, Chanel Web and Content', () => {
    const props: MessageConstructorProps = {
      direction: 'IN',
      channel: 'WEB',
      content: 'Lorem ipsum',
    };

    const message = Message.create(props);

    expect(message).toBeInstanceOf(Message);
    expect(message.direction).toEqual(props.direction);
    expect(message.channel).toEqual(props.channel);
    expect(message.content).toEqual(props.content);
    expect(message.createdAt).toBeInstanceOf(Date);
    expect(message.updatedAt).toBeInstanceOf(Date);
    expect(message.id).toBeInstanceOf(MessageId);
  });

  it('should be create Message success with Direction OUT, Chanel SMS and Content', () => {
    const props: MessageConstructorProps = {
      direction: 'OUT',
      channel: 'SMS',
      content: 'Lorem ipsum',
    };

    const message = Message.create(props);

    expect(message).toBeInstanceOf(Message);
    expect(message.direction).toEqual(props.direction);
    expect(message.channel).toEqual(props.channel);
    expect(message.content).toEqual(props.content);
    expect(message.createdAt).toBeInstanceOf(Date);
    expect(message.updatedAt).toBeInstanceOf(Date);
    expect(message.id).toBeInstanceOf(MessageId);
  });
});
