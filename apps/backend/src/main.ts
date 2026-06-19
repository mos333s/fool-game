import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes();
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  const frontendUrl = configService.get<string>('FRONTEND_URL');
  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    maxAge: 600,
  });
  await app.listen(port ?? 3000);
}
void bootstrap();
