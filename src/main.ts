import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'src/lib/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(env.PORT);
  console.log(`Server is running on port http://localhost:${env.PORT}`);
}
bootstrap();
