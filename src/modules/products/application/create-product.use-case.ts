import { Inject, Injectable } from '@nestjs/common';
import type { ProductRepositoryPort } from '../domain/product.repository.port';
import { ProductEntity } from '../domain/product.entity';
import { CreateProductDto } from './product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,
  ) { }

  async execute(dto: CreateProductDto): Promise<ProductEntity> {
    // Check if slug exists logic could be added here

    const product = new ProductEntity({
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      price: dto.price,
      stock: dto.stock,
      categoryId: dto.categoryId,
    });

    await this.productRepository.insert(product);

    return product;
  }
}
