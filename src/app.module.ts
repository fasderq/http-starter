import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { HealthModule } from './health/health.module';
import { AppLoggerModule } from './logger/logger.module';

@Module({
  imports: [AppConfigModule, AppLoggerModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
