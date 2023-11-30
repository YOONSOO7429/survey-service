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
      const deleteOption = await this.optionRepository.delete({ optionId });
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

  /* 선택지 전체 조회 */
  async findAllOption(questionId: number): Promise<any> {
    try {
      const option = await this.optionRepository
        .createQueryBuilder('option')
        .select(['questionId', 'optionId', 'optionNumber', 'optionContent'])
        .where('questionId = :questionId', { questionId })
        .getRawMany();
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/findAllOption');
    }
  }
}
