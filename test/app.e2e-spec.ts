import { INestApplication, RequestMethod } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AppModule } from '@app/app.module';
import { AppConfigService } from '@app/config/app-config.service';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    const appConfigService = app.get(AppConfigService);
    app.setGlobalPrefix(appConfigService.globalPrefix, {
      exclude: [
        { path: 'health', method: RequestMethod.GET },
        { path: 'ready', method: RequestMethod.GET },
      ],
    });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/health (GET) returns health status', async () => {
    const response = await request(app.getHttpServer()).get('/health').expect(200);
    expect(response.body.status).toBe('ok');
  });

  it('/api/health (GET) is excluded from prefix', () => {
    return request(app.getHttpServer()).get('/api/health').expect(404);
  });

  it('/ready (GET) returns ready status', async () => {
    const response = await request(app.getHttpServer()).get('/ready').expect(200);
    expect(response.body.status).toBe('ready');
  });

  it('unknown route returns unified error response', async () => {
    const response = await request(app.getHttpServer()).get('/api/unknown').expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      error: 'Not Found',
      message: 'Cannot GET /api/unknown',
    });
  });
});
