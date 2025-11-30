# E-commerce Backend (Hexagonal Architecture)

This project is a professional, fully functional backend for an e-commerce platform built with NestJS, following Hexagonal Architecture (Ports & Adapters).

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
pnpm prisma:migrate

# (Optional) Seed the database
pnpm prisma:seed

# Start development server
pnpm start:dev

# Access API docs at http://localhost:3000/api/docs
```

## 🏗️ Architecture Overview

The project is structured to enforce separation of concerns and maintainability:

- **Domain Layer** (`src/modules/*/domain`): Contains the core business logic, Entities, Value Objects, and Repository Interfaces (Ports). This layer is independent of the framework and external libraries.
- **Application Layer** (`src/modules/*/application`): Contains Use Cases (Interactors) and DTOs. It orchestrates the domain logic and adapts data for the domain.
- **Infrastructure Layer** (`src/modules/*/infrastructure`): Contains the implementation of the ports (Repositories, Adapters), Controllers, and framework-specific code.

## ✨ Key Features

- **Hexagonal Architecture**: Strict separation of layers for maintainability and testability.
- **Authentication**: JWT Access + Refresh Token authentication.
- **Database**: PostgreSQL with Prisma ORM.
- **Validation**: Global ValidationPipe with DTOs using class-validator.
- **Documentation**: Swagger UI auto-generated at `/api/docs`.
- **Type Safety**: Full TypeScript with strict mode.
- **Testing**: Unit tests with Jest, E2E tests with Supertest.
- **CORS**: Configurable CORS for frontend integration.

## 📦 Modules

| Module       | Description                          |
| ------------ | ------------------------------------ |
| `auth`       | JWT authentication (login, register) |
| `users`      | User management (CRUD operations)    |
| `products`   | Product catalog management           |
| `categories` | Product categories management        |

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm (recommended) or npm

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

| Variable                         | Description                        | Default                 |
| -------------------------------- | ---------------------------------- | ----------------------- |
| `DATABASE_URL`                   | PostgreSQL connection string       | -                       |
| `JWT_SECRET`                     | Secret for JWT access tokens       | -                       |
| `JWT_EXPIRATION_SECONDS`         | Access token expiration (seconds)  | `3600` (1h)             |
| `JWT_REFRESH_SECRET`             | Secret for JWT refresh tokens      | -                       |
| `JWT_REFRESH_EXPIRATION_SECONDS` | Refresh token expiration (seconds) | `604800` (7d)           |
| `PORT`                           | Server port                        | `3001`                  |
| `FRONTEND_URL`                   | Frontend URL for CORS              | `http://localhost:3000` |

### Example .env file

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gys_eco_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRATION_SECONDS=3600
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
JWT_REFRESH_EXPIRATION_SECONDS=604800
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# (Optional) Seed the database
pnpm prisma:seed

# Open Prisma Studio
pnpm prisma:studio
```

### 4. Run the Application

```bash
# Development
pnpm start:dev

# Production
pnpm build
pnpm start:prod

# Debug mode
pnpm start:debug
```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# Unit tests with watch mode
pnpm test:watch

# Unit tests with coverage
pnpm test:cov

# E2E tests
pnpm test:e2e
```

## 📚 API Documentation

Access Swagger UI at: `http://localhost:3000/api/docs`

### API Prefix

All API routes are prefixed with `/api/v1`

### Main Endpoints

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| `POST` | `/api/v1/auth/register` | Register new user   |
| `POST` | `/api/v1/auth/login`    | Login user          |
| `GET`  | `/api/v1/products`      | List all products   |
| `POST` | `/api/v1/products`      | Create product      |
| `GET`  | `/api/v1/categories`    | List all categories |
| `POST` | `/api/v1/categories`    | Create category     |
| `POST` | `/api/v1/users`         | Create user         |

## 🚢 Deployment

### Docker (Recommended)

```dockerfile
# Build
docker build -t gys-eco-backend .

# Run
docker run -p 3000:3000 --env-file .env gys-eco-backend
```

### Production Checklist

- [ ] Set strong `JWT_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Configure `DATABASE_URL` for production database
- [ ] Set appropriate `FRONTEND_URL` for CORS
- [ ] Run `pnpm build` before deployment
- [ ] Run database migrations: `pnpm prisma:migrate deploy`

## 📁 Project Structure

```
src/
├── common/             # Shared utilities and decorators
├── config/             # Configuration files
├── database/           # Database module and Prisma service
├── modules/            # Feature modules
│   ├── auth/           # Authentication module
│   ├── users/          # Users module
│   ├── products/       # Products module
│   └── categories/     # Categories module
│       ├── application/    # Use Cases, DTOs
│       ├── domain/         # Entities, Repository Ports
│       └── infrastructure/ # Controllers, Repository Impl, Mappers
├── shared/             # Shared Kernel (Base Entity, Mapper Interface)
├── app.module.ts       # Root module
└── main.ts             # Entry point
```

## 🎯 Architecture Benefits

- **Scalability**: New features can be added as new modules without affecting existing ones.
- **Testability**: Business logic in Domain/Application layers can be unit tested easily by mocking ports.
- **Maintainability**: Framework dependencies are isolated in the Infrastructure layer.
- **Independence**: Domain layer is pure TypeScript with no external dependencies.

## 📝 License

UNLICENSED - Private project
