import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 입력값 유효성 검사를 위한 ValidationPipe
  app.setGlobalPrefix('api'); //글로벌 프리픽스 설정
  await app.listen(4000); // 4000번 포트
}
bootstrap();
