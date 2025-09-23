# Copilot Instructions for caker-be

## Overview

- Stack: NestJS v11 (TypeScript), Prisma (client output at `generated/prisma`), MySQL & Redis via docker-compose for local infra, Jest for unit/e2e tests, Yarn v1 workstyle.
- Entry: `src/main.ts` bootstraps `AppModule`.
- Module layout: `src/{users,auth,common}`. Users follows a layered structure: `presentation/` (controllers) and `domain/service/` (services). Keep this separation when adding features.

## Local Dev Workflow

- Node/Yarn: Use Node >= 20 and Yarn 1.x.
  - Repo enforces this via `.nvmrc` and `package.json#engines`.
  - Switch with `nvm use` before installing deps.
- Install & run:
  - `yarn install`
  - `yarn start:dev` for watch mode, `yarn start` for one-off run.
- Tests:
  - Unit tests live next to code as `*.spec.ts` and run with `yarn test` (Jest; rootDir=`src`).
  - E2E tests under `test/` with `yarn test:e2e`.
- Formatting/Lint:
  - `yarn format` and `yarn lint`.

## Data & Infra

- Prisma datasource currently targets `postgresql` via `DATABASE_URL` in `prisma/schema.prisma`, but docker-compose provides MySQL/Redis. If you intend to use MySQL locally, update the provider and URL consistently, or run an external Postgres. Prisma client outputs to `generated/prisma`.
- docker-compose services:
  - `mysql:8.0` exposed at `3306`, persistent volume `mysql_data`.
  - `redis` exposed at `6379`, volume `redis_data`.

## Project Conventions

- Layered by feature domain:
  - Controller in `presentation/` and service in `domain/service/` (e.g., `src/users/presentation/users.controller.ts`, `src/users/domain/service/users.service.ts`).
  - Module file at `src/<feature>/<feature>.module.ts` wires the controller+service.
- Keep controllers thin; put business logic in services. Prefer constructor injection for dependencies.
- Expose routes with Nest decorators (`@Controller('route')`, `@Get`, `@Post`, etc.). Default example at `AppController`.
- Place common cross-cutting concerns in `src/common` and auth in `src/auth`.

## Testing Patterns

- Unit tests: colocate `*.spec.ts` per file. Jest config uses `ts-jest` transform.
- E2E tests: use `test/jest-e2e.json` with `ts-jest` and regex `.e2e-spec.ts$`.

## Commands Reference

- Dev: `yarn start:dev`
- Build: `yarn build` -> emits to `dist/`, then `yarn start:prod` runs `node dist/main`
- Tests: `yarn test`, `yarn test:watch`, `yarn test:e2e`, `yarn test:cov`
- Lint/Format: `yarn lint`, `yarn format`

## Adding a New Feature (Example: posts)

1. Generate module/controller/service (Nest CLI or manual):
   - Module: `src/posts/posts.module.ts`
   - Controller: `src/posts/presentation/posts.controller.ts`
   - Service: `src/posts/domain/service/posts.service.ts`
2. Register in `AppModule#imports`.
3. Add DTOs/types under the feature folder if needed.
4. Add unit specs next to new files, e.g., `posts.controller.spec.ts`.

## Prisma Tips

- After editing `prisma/schema.prisma`, run `npx prisma generate` (or add a script) to refresh the client in `generated/prisma`.
- Ensure `DATABASE_URL` in env matches chosen provider (Postgres vs MySQL). Keep docker-compose and Prisma in sync.

## Gotchas

- Engines: Node < 20 will fail installing Nest v11 deps. Use `nvm use` or upgrade.
- Jest rootDir is `src`; e2e config is separate under `test/`.
- If using docker-compose MySQL, Prisma provider must be changed from `postgresql` to `mysql` to avoid runtime errors.
