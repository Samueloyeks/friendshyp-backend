import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: 'GET,POST',
    allowedHeaders:
      'Content-Type, Accept, Access-Control-Allow-Headers, Authorization',
  });
  await app.listen(3000);
}

bootstrap();
