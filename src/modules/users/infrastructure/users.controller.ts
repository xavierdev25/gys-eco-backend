import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserUseCase } from '../application/create-user/create-user.use-case';
import { CreateUserDto } from '../application/create-user/create-user.dto';
import { UserResponseDto } from '../application/user.dto';
import { UserMapper } from './user.mapper';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly mapper: UserMapper,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(dto);
    return this.mapper.toResponse(user);
  }
}
