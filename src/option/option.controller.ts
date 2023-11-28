import { Controller, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/createOption.dto';
import { QuestionService } from 'src/question/question.service';

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
}
