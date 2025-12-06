import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserUseCase } from '../application/create-user/create-user.use-case';
import { CreateUserDto } from '../application/create-user/create-user.dto';
import { UserResponseDto } from '../application/user.dto';
import { UserMapper } from './user.mapper';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { UserRepositoryPort } from '../domain/user.repository.port';
import { Inject } from '@nestjs/common';

interface AuthenticatedRequest {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly mapper: UserMapper,
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(dto);
    return this.mapper.toResponse(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneById(req.user.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.mapper.toResponse(user);
  }
}
