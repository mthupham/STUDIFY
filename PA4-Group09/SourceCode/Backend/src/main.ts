import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Studify API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const logger = new Logger('Bootstrap');
  const maxAttempts = 10;
  let port = Number(process.env.PORT ?? 3000);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      await app.listen(port);
      logger.log(`Server started on http://localhost:${port}`);
      logger.log(`Swagger docs available at http://localhost:${port}/api`);
      return;
    } catch (error) {
      const addressInUse =
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as NodeJS.ErrnoException).code === 'EADDRINUSE';

      if (addressInUse && attempt < maxAttempts - 1) {
        logger.warn(`Port ${port} is busy. Trying ${port + 1} instead.`);
        port += 1;
        continue;
      }

      throw error;
    }
  }
}

bootstrap();