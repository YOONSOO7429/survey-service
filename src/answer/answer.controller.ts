import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/createAnswer.dto';
import { SurveyService } from 'src/survey/survey.service';
import { QuestionService } from 'src/question/question.service';
import { EditAnswerDto } from './dto/editAnswer.dto';

@Controller('answer')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService,
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
  ) {}

  /* 답변 생성 */
  @Post('createAnswer')
  async createAnswer(
    @Body() createAnswerDto: CreateAnswerDto,
    @Res() res: any,
  ): Promise<any> {
    try {
      const surveyId = createAnswerDto.surveyId;
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 조회
      const question = await this.questionService.findAllQuestion(surveyId);

      // 답변 확인
      const answerContent = createAnswerDto.answerContent;
      if (answerContent.length !== question.length) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: '답변을 모두 작성해주세요' });
      } else {
        await this.answerService.createAnswer(createAnswerDto);
        return res.status(HttpStatus.OK).json({ message: '답변 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('AnswerController/createAnswer');
    }
  }

  /* 답변 수정 */
  @Put(':answerId/editAnswer')
  async editAnswer(
    @Body() editAnswerDto: EditAnswerDto,
    @Param('answerId') answerId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const surveyId = editAnswerDto.surveyId;
      const answerContent = editAnswerDto.answerContent;
      // 문항 조회
      const question = await this.questionService.findAllQuestion(surveyId);
      if (answerContent.length !== question.length) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: '답변을 모두 작성해주세요' });
      } else {
        await this.answerService.editAnswer(editAnswerDto, answerId);
        return res.status(HttpStatus.OK).json({ message: '답변 수정 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('AnswerController/editAnswer');
    }
  }

  /* 답변 삭제 */
  @Delete(':answerId/deleteAnswer')
  async deleteAnswer(
    @Param('answerId') answerId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 답변 조회
      const answer = await this.answerService.findOneAnswer(answerId);
      if (!answer) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 답변입니다.' });
      } else {
        await this.answerService.deleteAnswer(answerId);
        return res.status(HttpStatus.OK).json({ message: '답변 삭제 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('AnswerController/deleteAnswer');
    }
  }
}
