import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/products.controller';
import { CreateProductUseCase } from './application/create-product.use-case';
import { PrismaProductRepository } from './infrastructure/product.repository';
import { ProductMapper } from './infrastructure/product.mapper';

@Module({
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    ProductMapper,
    {
      provide: 'ProductRepositoryPort',
      useClass: PrismaProductRepository,
    },
  ],
  exports: ['ProductRepositoryPort'],
})
export class ProductsModule {}
