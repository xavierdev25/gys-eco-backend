import { RepositoryPort } from '../../../shared/domain/repository.port';
import { ProductEntity } from './product.entity';

export interface ProductRepositoryPort extends RepositoryPort<ProductEntity> {
  findAllByCategoryId(categoryId: string): Promise<ProductEntity[]>;
}
