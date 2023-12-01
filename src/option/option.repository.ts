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
    question_id: number,
  ): Promise<any> {
    try {
      const { option_content, option_number } = createOptionDto;
      const option = new Option();
      option.option_number = option_number;
      option.option_content = option_content;
      option.question_id = question_id;
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
    question_id: number,
  ): Promise<any> {
    try {
      const { option_content, option_number } = editOptionDto;
      const editOption = await this.optionRepository
        .createQueryBuilder('option')
        .update(Option)
        .set({ option_content, option_number })
        .where('question_id = :question_id', { question_id }).execute;
      return editOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionRepository/editOption');
    }
  }

  /* 선택지 삭제 */
  async deleteOption(option_id: number): Promise<any> {
    try {
      const deleteOption = await this.optionRepository
        .createQueryBuilder('option')
        .delete()
        .from(Option)
        .where('option_id = :option_id', { option_id })
        .execute();
      return deleteOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/deleteOption');
    }
  }

  /* 선택지 상세 조회 */
  async findOneOption(option_id: number): Promise<any> {
    try {
      const option = await this.optionRepository.findOne({
        where: { option_id },
      });
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/findOneOption');
    }
  }

  /* 선택지 전체 조회 */
  async findAllOption(question_id: number): Promise<any> {
    try {
      const option = await this.optionRepository
        .createQueryBuilder('option')
        .select(['question_id', 'option_id', 'option_number', 'option_content'])
        .where('question_id = :question_id', { question_id })
        .getRawMany();
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/findAllOption');
    }
  }
}
