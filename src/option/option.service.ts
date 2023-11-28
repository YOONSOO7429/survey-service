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

  /* 선택지 수정 */
  async editOption(
    editOptionDto: EditOptionDto,
    optionId: number,
  ): Promise<any> {
    try {
      const editOption = await this.optionRepository.editOption(
        editOptionDto,
        optionId,
      );
      return editOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/editOption');
    }
  }

  /* 선택지 삭제 */
  async deleteOption(optionId: number): Promise<any> {
    try {
      const deleteOption = await this.optionRepository.deleteOption(optionId);
      return deleteOption;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/deleteOption');
    }
  }

  /* 선택지 상세 조회 */
  async findOneOption(optionId: number): Promise<any> {
    try {
      const option = await this.optionRepository.findOneOption(optionId);
      return option;
    } catch (e) {
      console.error(e);
      throw new Error('OptionService/findOneOption');
    }
  }
}
