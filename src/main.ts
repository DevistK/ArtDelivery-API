import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(8080);
  app.use(helmet({ contentSecurityPolicy: false }));
}
bootstrap();
