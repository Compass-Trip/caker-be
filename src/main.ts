import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 활성화
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Graceful Shutdown 활성화 (ECS 종료시그널 처리)
  app.enableShutdownHooks();

  // 전역 필터 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 설정
  const swaggerConfig = new DocumentBuilder()
    .setTitle('caker-backend')
    .setVersion('0.1')
    .build();
  const swagger = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swagger);

  // API Prefix 설정
  app.setGlobalPrefix('api');
  // 포트 설정
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🏥 Health check available at: ${await app.getUrl()}/health`);
}
bootstrap();
