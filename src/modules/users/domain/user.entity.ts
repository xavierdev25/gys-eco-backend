import { Entity } from '../../../shared/domain/entity.base';
import { UserProps, UserRole } from './user.types';

export class UserEntity extends Entity<UserProps> {
  get email(): string {
    return this.props.email;
  }

  get password(): string | undefined {
    return this.props.password;
  }

  get name(): string | null | undefined {
    return this.props.name;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  public validate(): void {
    // Add domain validation logic here
  }
}
