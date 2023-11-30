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
  @Post(':questionId/createOption')
  async createOption(
    @Body() createOptionDto: CreateOptionDto,
    @Param('questionId') questionId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(questionId);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 생성
      await this.optionService.createOption(createOptionDto, questionId);
      return res.status(HttpStatus.OK).json({ message: '선택지 생성 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('OptionController/createOption');
    }
  }

  /* 선택지 수정 */
  @Put(':questionId/:optionId/editOption')
  async editOption(
    @Body() editOptionDto: EditOptionDto,
    @Param('optionId') optionId: number,
    @Param('questionId') questionId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(questionId);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findOneOption(optionId);
      if (!option) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 선택지입니다.' });
      }

      // 선택지 수정
      const editOption = await this.optionService.editOption(
        editOptionDto,
        optionId,
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
  @Delete(':questionId/:optionId/deleteOption')
  async deleteOption(
    @Param('optionId') optionId: number,
    @Param('questionId') questionId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(questionId);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findOneOption(optionId);
      if (!option) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 선택지입니다.' });
      }

      // 선택지 삭제
      const deleteOption = await this.optionService.deleteOption(optionId);
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
  @Get(':questionId')
  async getAllQuestion(
    @Param('questionId') questionId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 문항 조회
      const question = await this.questionService.findOneQuestion(questionId);
      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findAllOption(questionId);
      return res.status(HttpStatus.OK).json(option);
    } catch (e) {
      console.error(e);
      throw new Error('OptionController/getAllQuestion');
    }
  }
}
