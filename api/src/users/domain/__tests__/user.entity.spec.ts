import { User, UserContructorProps, UserId } from '../entities/user.entity';

describe('User entity unit test', () => {
  it('should create user success', () => {
    const props: UserContructorProps = {
      name: 'Jonh Doe',
      email: 'jonh@mail.com',
    };

    const user = User.create(props);

    expect(user.name).toEqual('Jonh Doe');
    expect(user.email).toEqual('jonh@mail.com');
    expect(user.password).toEqual('');
    expect(user.id).toBeInstanceOf(UserId);
    expect(user).toBeInstanceOf(User);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
