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
      const questionId = createAnswerDto.questionId;
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(surveyId);
      if (!survey) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 조회
      const question = await this.questionService.findOneQuestion(questionId);
      if (question.duplicateAnswer === false) {
        const answer =
          await this.answerService.findAnswerByDuplicate(questionId);
        if (answer) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '이미 답변한 문항입니다.' });
        } else {
          await this.answerService.createAnswer(createAnswerDto);
          return res.status(HttpStatus.OK).json({ message: '답변 성공' });
        }
      } else {
        await this.answerService.createAnswer(createAnswerDto);
        return res.status(HttpStatus.OK).json({ message: '답변 성공' });
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
      const questionId = editAnswerDto.questionId;

      // 문항 조회
      const question = await this.questionService.findOneQuestion(questionId);
      if (question.duplicateAnswer === false) {
        const answer =
          await this.answerService.findAnswerByDuplicate(questionId);
        if (answer.length < 1) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '이미 답변한 문항입니다.' });
        } else {
          await this.answerService.editAnswer(editAnswerDto, answerId);
          return res.status(HttpStatus.OK).json({ message: ' 답변 수정 성공' });
        }
      }
    } catch (e) {
      console.error(e);
      throw new Error('AnswerController/editAnswer');
    }
  }

  /* 답변 삭제 */
  // @Delete(':answerId/deleteAnswer')
  // async deleteAnswer(@Res() res: any): Promise<any> {
  //   const questionId =
  // }
}
