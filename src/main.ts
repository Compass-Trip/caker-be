import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 활성화
  app.enableCors();

  // Graceful Shutdown 활성화 (ECS 종료시그널 처리)
  app.enableShutdownHooks();

  // 포트 설정
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🏥 Health check available at: ${await app.getUrl()}/health`);
}
bootstrap();
