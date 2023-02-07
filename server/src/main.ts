require('dotenv').config();
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
  Logger.log(
    `Server listening on http://${process.env.HOST || 'localhost'}:${
      process.env.PORT || 3001
    }`,
    'NestApplication',
  );
}
bootstrap();
