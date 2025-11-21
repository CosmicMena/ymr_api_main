"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression = require("compression");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.use(compression());
    const httpInstance = app.getHttpAdapter().getInstance();
    httpInstance.set('trust proxy', 1);
    const corsOrigins = configService
        .get('CORS_ORIGIN', 'http://localhost:5173,http://127.0.0.1:5173')
        .split(',');
    app.enableCors({
        origin: corsOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    if (configService.get('ENABLE_SWAGGER') === 'true') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('YMR System API')
            .setDescription('Complete REST API for YMR System - Equipment Management Platform')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .addServer('/api')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
        app.getHttpAdapter().getInstance().get('/', (_req, res) => res.redirect('/api/docs'));
    }
    app.setGlobalPrefix('api');
    const port = configService.get('PORT', 3000);
    const host = configService.get('HOST', '0.0.0.0');
    app.enableShutdownHooks();
    await app.listen(port, host);
    const publicHost = configService.get('PUBLIC_HOST', 'localhost');
    console.log(`🚀 YMR System API is running on: http://${publicHost}:${port}`);
    console.log(`📚 Swagger documentation: http://${publicHost}:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map