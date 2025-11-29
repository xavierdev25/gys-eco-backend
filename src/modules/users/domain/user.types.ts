import type { BaseEntityProps } from '../../../shared/domain/entity.base';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserProps extends BaseEntityProps {
  email: string;
  password?: string; // Optional because we might not load it always, or for security
  name?: string | null;
  role: UserRole;
  deletedAt?: Date | null;
}
