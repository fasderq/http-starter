# http-starter

Стартовый HTTP-сервис на `NestJS` + `Fastify` с быстрым dev/prod циклом на `SWC`, логированием через `pino` и конфигом с валидацией через `zod`.

## Технологии

- `NestJS` 12
- `Fastify` (`@nestjs/platform-fastify`)
- `SWC` для сборки и dev-runtime
- `Vitest` для тестов
- `nestjs-pino` + `pino-pretty` (pretty только в dev)
- `@nestjs/config` + `zod` для валидации env

## Быстрый старт

```bash
yarn install
cp .env.example .env
```

Для Windows можно просто создать `.env` рядом с `.env.example`.

## Переменные окружения

Смотри `.env.example`:

- `NODE_ENV=development`
- `PORT=3000`
- `GLOBAL_PREFIX=api`

Валидация выполняется на старте приложения (`zod`), поэтому при неверном env приложение не поднимется.

## Скрипты

```bash
# сборка
yarn build

# запуск собранной версии
yarn start

# dev-режим с watch (SWC runtime)
yarn start:dev

# dev-режим с инспектором
yarn start:debug

# тесты
yarn test
yarn test:e2e
yarn test:cov
```

## Роутинг и префикс

- Глобальный префикс берется из `GLOBAL_PREFIX` (по умолчанию `api`).
- `health` и `ready` исключены из префикса.

Примеры:

- `GET /health`
- `GET /ready`
- API-роуты: `GET /api/...` (или другой префикс из `GLOBAL_PREFIX`)

## Логирование

- Используется `pino` через `nestjs-pino`.
- В `development` включается `pino-pretty`.
- В `production` логи остаются в JSON-формате.

## Ошибки

- Подключен глобальный `HttpExceptionFilter` для унификации ошибок Nest-исключений.
- Для несуществующих роутов используется стандартный fastify 404-ответ.

## Тестирование

- Тест-раннер: `Vitest`
- E2E: `test/app.e2e-spec.ts`
- Проверяются `health`, `ready`, поведение префикса и 404 для неизвестного маршрута.

## Структура

- `src/main.ts` — bootstrap приложения
- `src/app.module.ts` — корневой модуль
- `src/config/*` — конфиг, schema и типобезопасный сервис
- `src/logger/*` — логирование
- `src/health/*` — health/readiness endpoints
