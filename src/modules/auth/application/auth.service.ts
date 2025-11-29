import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { UserRepositoryPort } from '../../users/domain/user.repository.port';
import { LoginDto, TokenResponseDto } from './auth.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../../users/application/create-user/create-user.dto';
import { CreateUserUseCase } from '../../users/application/create-user/create-user.use-case';
import { UserMapper } from '../../users/infrastructure/user.mapper';
import { UserResponseDto } from '../../users/application/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly userMapper: UserMapper,
  ) { }

  async login(dto: LoginDto): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneByEmail(dto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email);
  }

  async register(dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(dto);
    return this.userMapper.toResponse(user);
  }

  private generateTokens(userId: string, email: string): TokenResponseDto {
    const payload = { sub: userId, email };
    // Use numbers (seconds) for expiresIn to avoid type issues with ms StringValue
    const accessExpirationSeconds = parseInt(
      process.env.JWT_EXPIRATION_SECONDS || '3600',
      10,
    ); // 1h default
    const refreshExpirationSeconds = parseInt(
      process.env.JWT_REFRESH_EXPIRATION_SECONDS || '604800',
      10,
    ); // 7d default

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: accessExpirationSeconds,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      expiresIn: refreshExpirationSeconds,
    });

    return { accessToken, refreshToken };
  }
}
