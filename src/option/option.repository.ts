import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/createOption.dto';
import { EditOptionDto } from './dto/editOption.dto';

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
      throw new Error('OptionRepository/createOption');
    }
  }

  /* 선택지 수정 */
  async editOption(
    editOptionDto: EditOptionDto,
    optionId: number,
  ): Promise<any> {
    try {
      const { optionContent, optionNumber } = editOptionDto;
      const editOption = await this.optionRepository.update(
        { optionId },
        { optionContent, optionNumber },
      );
      return editOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionRepository/editOption');
    }
  }

  /* 선택지 삭제 */
  async deleteOption(optionId: number): Promise<any> {
    try {
      // 한국 시간
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      const deleteOption = await this.optionRepository.update(
        { optionId },
        { optionDeletedAt: today },
      );
      return deleteOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/deleteOption');
    }
  }

  /* 선택지 상세 조회 */
  async findOneOption(optionId: number): Promise<any> {
    try {
      const option = await this.optionRepository.findOne({
        where: { optionId },
      });
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/findOneOption');
    }
  }
}
