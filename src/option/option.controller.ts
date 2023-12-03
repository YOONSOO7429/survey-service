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
  LoggerService,
  Inject,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/createOption.dto';
import { QuestionService } from 'src/question/question.service';
import { EditOptionDto } from './dto/editOption.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('option')
export class OptionController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
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
        this.logger.error('존재하지 않는 문항입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 전체 조회
      const options = await this.optionService.findAllOption(question_id);
      for (let i = 0; i < options.length; i++) {
        if (options[i].option_number === createOptionDto.option_number) {
          this.logger.error('이미 선택지 번호가 존재합니다.');
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '이미 선택지 번호가 존재합니다.' });
        }
      }

      // 선택지 생성
      await this.optionService.createOption(createOptionDto, question_id);
      this.logger.log('선택지 생성 완료');
      return res.status(HttpStatus.OK).json({ message: '선택지 생성 완료' });
    } catch (e) {
      this.logger.error(
        `선택지 생성 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '선택지 생성 중에 오류가 발생했습니다.',
        error: e.message,
      });
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
        this.logger.error('존재하지 않는 문항입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findOneOption(option_id);
      if (!option) {
        this.logger.error('존재하지 않는 선택지입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 선택지입니다.' });
      }

      // 선택지 전체 조회
      const options = await this.optionService.findAllOption(question_id);
      for (let i = 0; i < options.length; i++) {
        if (options[i].option_number === editOptionDto.option_number) {
          this.logger.error('이미 선택지 번호가 존재합니다.');
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
        this.logger.error('선택지 수정에 실패했습니다.');
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '선택지 수정에 실패했습니다.' });
      }

      this.logger.log('선택지 수정 완료');
      return res.status(HttpStatus.OK).json({ message: '선택지 수정 완료' });
    } catch (e) {
      this.logger.error(
        `선택지 수정 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '선택지 수정 중에 오류가 발생했습니다.',
        error: e.message,
      });
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
        this.logger.error('존재하지 않는 문항입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findOneOption(option_id);
      if (!option) {
        this.logger.error('존재하지 않는 선택지입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 선택지입니다.' });
      }

      // 선택지 삭제
      const deleteOption = await this.optionService.deleteOption(option_id);
      if (deleteOption.affected === 0) {
        this.logger.error('선택지 삭제에 실패했습니다.');
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '설문지 삭제에 실패했습니다.' });
      }
      this.logger.log('선택지 삭제 완료');
      return res.status(HttpStatus.OK).json({ message: '선택지 삭제 완료' });
    } catch (e) {
      this.logger.error(
        `선택지 삭제 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '선택지 삭제 중에 오류가 발생했습니다.',
        error: e.message,
      });
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
        this.logger.error('존재하지 않는 문항입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 문항입니다.' });
      }

      // 선택지 조회
      const option = await this.optionService.findAllOption(question_id);
      this.logger.log('선택지 조회 완료');
      return res.status(HttpStatus.OK).json(option);
    } catch (e) {
      this.logger.error(
        `선택지 조회 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '선택지 조회 중에 오류가 발생했습니다.',
        error: e.message,
      });
    }
  }
}
