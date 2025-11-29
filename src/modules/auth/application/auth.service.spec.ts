import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from '../../users/application/create-user/create-user.use-case';
import { UserMapper } from '../../users/infrastructure/user.mapper';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

const mockUserRepository = () => ({
  findOneByEmail: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(() => 'mock-token'),
});

const mockCreateUserUseCase = () => ({
  execute: jest.fn(),
});

const mockUserMapper = () => ({
  toResponse: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: ReturnType<typeof mockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'UserRepositoryPort', useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
        { provide: CreateUserUseCase, useFactory: mockCreateUserUseCase },
        { provide: UserMapper, useFactory: mockUserMapper },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get('UserRepositoryPort');
  });

  it('should throw UnauthorizedException if user not found', async () => {
    userRepository.findOneByEmail.mockResolvedValue(null);

    await expect(
      service.login({ email: 'notfound@example.com', password: '123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if password invalid', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
    };
    userRepository.findOneByEmail.mockResolvedValue(mockUser);

    await expect(
      service.login({ email: 'test@example.com', password: 'wrongpassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return tokens on successful login', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
    };
    userRepository.findOneByEmail.mockResolvedValue(mockUser);

    const result = await service.login({
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual({
      accessToken: 'mock-token',
      refreshToken: 'mock-token',
    });
  });
});
