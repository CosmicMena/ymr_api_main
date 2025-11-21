import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security & performance middleware
  app.use(helmet());
  app.use(compression());
  const httpInstance = app.getHttpAdapter().getInstance();
  httpInstance.set('trust proxy', 1);

  // CORS configuration
  // Permitir explicitamente os origins do Vite por omissão para evitar falhas de preflight
  const corsOrigins = configService
    .get('CORS_ORIGIN', 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',');

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global validation pipe
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

  // Swagger documentation (optional via ENABLE_SWAGGER=true)
  if (configService.get('ENABLE_SWAGGER') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('YMR System API')
      .setDescription('Complete REST API for YMR System - Equipment Management Platform')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addServer('/api')
      .build();

    const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
    SwaggerModule.setup('api/docs', app, document, {
      customSiteTitle: 'YMR System API Documentation',
      customfavIcon: '/favicon.ico',
      customCssUrl: '/swagger-ui-custom.css',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
    // Redirect root '/' to Swagger docs when enabled
    app.getHttpAdapter().getInstance().get('/', (_req, res) => res.redirect('/api/docs'));
  }

  // Global prefix (combined with URI versioning → /api/v1)
  app.setGlobalPrefix('api');

  const port = configService.get('PORT', 3000);
  const host = configService.get('HOST', '0.0.0.0');
  // Enable graceful shutdown via Nest lifecycle hooks
  app.enableShutdownHooks();
  await app.listen(port, host);

  const publicHost = configService.get('PUBLIC_HOST', 'localhost');
  console.log(`🚀 YMR System API is running on: http://${publicHost}:${port}`);
  console.log(`📚 Swagger documentation: http://${publicHost}:${port}/api/docs`);
}

bootstrap();