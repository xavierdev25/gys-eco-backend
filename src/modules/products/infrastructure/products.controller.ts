import { Controller, Post, Body, Get, Query, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateProductUseCase } from '../application/create-product.use-case';
import {
  CreateProductDto,
  ProductResponseDto,
} from '../application/product.dto';
import { ProductMapper } from './product.mapper';
import type { ProductRepositoryPort } from '../domain/product.repository.port';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly mapper: ProductMapper,
    @Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.createProductUseCase.execute(dto);
    return this.mapper.toResponse(product);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiResponse({ status: 200, type: [ProductResponseDto] })
  async findAll(
    @Query('categoryId') categoryId?: string,
  ): Promise<ProductResponseDto[]> {
    const products = categoryId
      ? await this.productRepository.findAllByCategoryId(categoryId)
      : await this.productRepository.findAll();
    return products.map((p) => this.mapper.toResponse(p));
  }
}
