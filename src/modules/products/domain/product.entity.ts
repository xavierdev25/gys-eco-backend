import { Entity, BaseEntityProps } from '../../../shared/domain/entity.base';

export interface ProductProps extends BaseEntityProps {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock: number;
  categoryId: string;
  deletedAt?: Date | null;
}

export class ProductEntity extends Entity<ProductProps> {
  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get price(): number {
    return this.props.price;
  }

  get stock(): number {
    return this.props.stock;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }
}
