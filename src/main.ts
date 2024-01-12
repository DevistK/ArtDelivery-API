import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'fatal', 'error', 'warn', 'debug'],
  });

  await app.listen(8080);
  app.use(helmet({ contentSecurityPolicy: false }));
}
bootstrap();
