import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { ConflictException } from '@nestjs/common';
import { UserRole } from '../../domain/user.types';

const mockUserRepository = () => ({
  findOneByEmail: jest.fn(),
  insert: jest.fn(),
});

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: ReturnType<typeof mockUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'UserRepositoryPort',
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get('UserRepositoryPort');
  });

  it('should create a user successfully', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: UserRole.USER,
    };

    userRepository.findOneByEmail.mockResolvedValue(null);
    userRepository.insert.mockResolvedValue(undefined);

    const result = await useCase.execute(dto);

    expect(result).toBeDefined();
    expect(result.email).toBe(dto.email);
    expect(userRepository.insert).toHaveBeenCalled();
  });

  it('should throw ConflictException if user already exists', async () => {
    const dto = {
      email: 'existing@example.com',
      password: 'password123',
    };

    userRepository.findOneByEmail.mockResolvedValue({ id: '123', ...dto });

    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
  });
});
