import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/createOption.dto';

@Injectable()
export class OptionRepository {
  constructor(
    @InjectRepository(Option) private optionRepository: Repository<Option>,
  ) {}

  /* 선택지 생성 */
  async createOption(
    createOptionDto: CreateOptionDto,
    questionId: number,
  ): Promise<any> {
    try {
      const { optionContent, optionNumber } = createOptionDto;
      const option = new Option();
      option.optionNumber = optionNumber;
      option.optionContent = optionContent;
      option.questionId = questionId;
      await this.optionRepository.save(option);
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/createOption');
    }
  }
}
