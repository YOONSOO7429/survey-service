import { Module, forwardRef } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { QuestionModule } from 'src/question/question.module';
import { OptionRepository } from './option.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option]),
    forwardRef(() => QuestionModule),
  ],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
  exports: [OptionService, OptionRepository],
})
export class OptionModule {}
