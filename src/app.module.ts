import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    // config 설정
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // db 설정
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
