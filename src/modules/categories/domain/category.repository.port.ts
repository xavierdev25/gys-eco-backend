import { RepositoryPort } from '../../../shared/domain/repository.port';
import { CategoryEntity } from './category.entity';

export interface CategoryRepositoryPort extends RepositoryPort<CategoryEntity> {
  findOneBySlug(slug: string): Promise<CategoryEntity | undefined>;
}
