import { Injectable } from '@nestjs/common';
import { OptionRepository } from './option.repository';
import { CreateOptionDto } from './dto/createOption.dto';
import { EditOptionDto } from './dto/editOption.dto';

@Injectable()
export class OptionService {
  constructor(private readonly optionRepository: OptionRepository) {}

  /* 선택지 생성 */
  async createOption(
    createOptionDto: CreateOptionDto,
    question_id: number,
  ): Promise<any> {
    try {
      const option = await this.optionRepository.createOption(
        createOptionDto,
        question_id,
      );
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/createOption');
    }
  }

  /* 선택지 수정 */
  async editOption(
    editOptionDto: EditOptionDto,
    option_id: number,
  ): Promise<any> {
    try {
      const editOption = await this.optionRepository.editOption(
        editOptionDto,
        option_id,
      );
      return editOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/editOption');
    }
  }

  /* 선택지 삭제 */
  async deleteOption(option_id: number): Promise<any> {
    try {
      const deleteOption = await this.optionRepository.deleteOption(option_id);
      return deleteOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/deleteOption');
    }
  }

  /* 선택지 상세 조회 */
  async findOneOption(question_id: number): Promise<any> {
    try {
      const option = await this.optionRepository.findOneOption(question_id);
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/findOneOption');
    }
  }

  /* 선택지 전체 조회 */
  async findAllOption(question_id: number): Promise<any> {
    try {
      const option = await this.optionRepository.findAllOption(question_id);
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/findAllOption');
    }
  }
}
