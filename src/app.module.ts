import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache/cache.service';
import { AppV2Controller } from './app.v2.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
      max: 10,
    }),
  ],
  controllers: [AppController, AppV2Controller],
  providers: [AppService, CacheService],
})
export class AppModule {}
