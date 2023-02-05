require('dotenv').config();
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3001);
  Logger.log(
    `Server listening on http://${process.env.HOST || 'localhost'}:${
      process.env.PORT || 3001
    }`,
    'NestApplication',
  );
}
bootstrap();
