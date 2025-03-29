import { Address } from 'src/shared/value-objects/address.vo';
import { Uuid } from 'src/shared/value-objects/uuid.vo';

export class UserId extends Uuid {}

export class UserContructorProps {
  id?: UserId;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address: Address;
}

export class User {
  id: UserId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  address: Address;

  private constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
    address,
  }: UserContructorProps) {
    this.id = id || new UserId();
    this.name = name;
    this.email = email;
    this.password = password || '';
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.address = address;
  }

  static create(props: UserContructorProps) {
    return new User(props);
  }
}
