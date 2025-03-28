import { Uuid } from 'src/shared/value-objects/uuid.vo';

export class UserId extends Uuid {}

export class UserContructorProps {
  id?: UserId;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  id?: UserId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: UserContructorProps) {
    this.id = props.id || new UserId();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password || '';
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: UserContructorProps) {
    return new User(props);
  }
}
