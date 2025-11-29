import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'smartphone' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'A great phone', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'category-uuid' })
  @IsUUID()
  categoryId: string;
}

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  categoryId: string;
}
