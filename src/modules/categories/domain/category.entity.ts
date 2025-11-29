import { Entity, BaseEntityProps } from '../../../shared/domain/entity.base';

export interface CategoryProps extends BaseEntityProps {
  name: string;
  slug: string;
  deletedAt?: Date | null;
}

export class CategoryEntity extends Entity<CategoryProps> {
  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
}
