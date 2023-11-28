import { Injectable } from '@nestjs/common';
import { OptionRepository } from './option.repository';
import { CreateOptionDto } from './dto/createOption.dto';

@Injectable()
export class OptionService {
  constructor(private readonly optionRepository: OptionRepository) {}

  /* 선택지 생성 */
  async createOption(
    createOptionDto: CreateOptionDto,
    questionId: number,
  ): Promise<any> {
    try {
      const option = await this.optionRepository.createOption(
        createOptionDto,
        questionId,
      );
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/createOption');
    }
  }
}
