import {
  Controller,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/createOption.dto';
import { QuestionService } from 'src/question/question.service';
import { EditOptionDto } from './dto/editOption.dto';

@Controller('option')
export class OptionController {
  constructor(
    private readonly optionService: OptionService,
    private readonly questionService: QuestionService,
  ) {}

  /* 선택지 생성 */
  @Post(':question_id/createOption')
  async createOption(
    @Body() createOptionDto: CreateOptionDto,
    @Param('question_id') question_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(question_id);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 전체 조회
      const options = await this.optionService.findAllOption(question_id);
      for (let i = 0; i < options.length; i++) {
        if (options[i].option_number === createOptionDto.option_number) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '이미 선택지 번호가 존재합니다.' });
        }
      }

      // 선택지 생성
      await this.optionService.createOption(createOptionDto, question_id);
      return res.status(HttpStatus.OK).json({ message: '선택지 생성 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('OptionController/createOption');
    }
  }

  /* 선택지 수정 */
  @Put(':question_id/:option_id/editOption')
  async editOption(
    @Body() editOptionDto: EditOptionDto,
    @Param('option_id') option_id: number,
    @Param('question_id') question_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(question_id);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findOneOption(option_id);
      if (!option) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 선택지입니다.' });
      }

      // 선택지 전체 조회
      const options = await this.optionService.findAllOption(question_id);
      for (let i = 0; i < options.length; i++) {
        if (options[i].option_number === editOptionDto.option_number) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '이미 선택지 번호가 존재합니다.' });
        }
      }

      // 선택지 수정
      const editOption = await this.optionService.editOption(
        editOptionDto,
        option_id,
      );
      if (editOption.affected === 0) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '내부 서버 에러' });
      }
      return res.status(HttpStatus.OK).json({ message: '선택지 수정 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('OptionController/editOption');
    }
  }

  /* 선택지 삭제 */
  @Delete(':question_id/:option_id/deleteOption')
  async deleteOption(
    @Param('option_id') option_id: number,
    @Param('question_id') question_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(question_id);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findOneOption(option_id);
      if (!option) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 선택지입니다.' });
      }

      // 선택지 삭제
      const deleteOption = await this.optionService.deleteOption(option_id);
      if (deleteOption.affected === 0) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '내부 서버 에러' });
      }
      return res.status(HttpStatus.OK).json({ message: '선택지 삭제 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('OptionController/deleteOption');
    }
  }

  /* 선택지 전체 조회 */
  @Get(':question_id')
  async getAllQuestion(
    @Param('question_id') question_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(question_id);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findAllOption(question_id);
      return res.status(HttpStatus.OK).json(option);
    } catch (e) {
      console.error(e);
      throw new Error('OptionController/getAllQuestion');
    }
  }
}
