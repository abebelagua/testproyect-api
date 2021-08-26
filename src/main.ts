import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const host = configService.get('HOST');
  const port = configService.get('PORT');

  await app.listen(process.env.PORT);

  Logger.log(`Server started running on http://${host}:${port}`, 'NestJS');
}
bootstrap();
