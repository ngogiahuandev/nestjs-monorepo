import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'src/lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);
  console.log(`Server is running on port http://localhost:${env.PORT}`);
}
bootstrap();
