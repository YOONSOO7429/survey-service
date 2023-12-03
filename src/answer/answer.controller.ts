import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
  Delete,
  Get,
  Logger,
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
    private readonly logger: Logger,
  ) {}

  /* 답변 생성 */
  @Post('createAnswer')
  async createAnswer(
    @Body() createAnswerDto: CreateAnswerDto,
    @Res() res: any,
  ): Promise<any> {
    try {
      const survey_id = createAnswerDto.survey_id;
      // 설문지 조회
      const survey = await this.surveyService.findOneSurvey(survey_id);
      if (!survey) {
        this.logger.error('존재하지 않는 설문지입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 설문지입니다.' });
      }

      // 문항 조회
      const question =
        await this.questionService.findAllQuestionWithOptions(survey_id);

      // 답변 확인
      const answer_content = createAnswerDto.answer_content;
      if (answer_content.length !== question.length) {
        this.logger.error('답변을 모두 작성해주세요');
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: '답변을 모두 작성해주세요.' });
      }

      // 중복 답변, 형태 검사
      for (let i = 0; i < answer_content.length; i++) {
        // 질문 번호 찾기
        const currentQuestion = question.find(
          (q) => q.question_number === answer_content[i].question_number,
        );

        // 검사 시작
        if (!Array.isArray(answer_content[i].option_number)) {
          this.logger.error('잘못된 답변 방법입니다.');
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '잘못된 답변 방법입니다.' });
        }

        // 선택지 번호 검사
        if (
          currentQuestion &&
          currentQuestion.option.some((opt) =>
            answer_content[i].option_number.includes(opt.option_number),
          )
        ) {
          this.logger.error(
            `${currentQuestion.question_number}번 문항의 선택 번호가 올바르지 않습니다.`,
          );
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `${currentQuestion.question_number}번 문항의 선택 번호가 올바르지 않습니다.`,
          });
        }

        // 선택지 중복 문항 검사
        if (
          currentQuestion &&
          currentQuestion.duplicate_answer === false &&
          answer_content[i].option_number.length !== 1
        ) {
          this.logger.error(
            `${currentQuestion.question_number}번 문항은 단일 답변만 허용됩니다.`,
          );
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `${currentQuestion.question_number}번 문항은 단일 답변만 허용됩니다.`,
          });
        }
      }
      await this.answerService.createAnswer(createAnswerDto);
      this.logger.log('답변 완료');
      return res.status(HttpStatus.OK).json({ message: '답변 완료' });
    } catch (e) {
      this.logger.error(
        `답변 생성 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '답변 생성 중에 오류가 발생했습니다.',
        error: e.message,
      });
    }
  }

  /* 답변 수정 */
  @Put(':answer_id/editAnswer')
  async editAnswer(
    @Body() editAnswerDto: EditAnswerDto,
    @Param('answer_id') answer_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const survey_id = editAnswerDto.survey_id;
      const answer_content = editAnswerDto.answer_content;
      // 문항 조회
      const question = await this.questionService.findAllQuestion(survey_id);
      if (answer_content.length !== question.length) {
        this.logger.error('답변을 모두 작성해주세요');
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: '답변을 모두 작성해주세요' });
      }

      // 중복 답변, 형태 검사
      for (let i = 0; i < answer_content.length; i++) {
        // 질문 번호 찾기
        const currentQuestion = question.find(
          (q) => q.question_number === answer_content[i].question_number,
        );

        // 검사 시작
        if (!Array.isArray(answer_content[i].option_number)) {
          this.logger.error('잘못된 답변 방법입니다.');
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: '잘못된 답변 방법입니다.' });
        }

        // 선택지 번호 검사
        if (
          currentQuestion &&
          currentQuestion.option.some((opt) =>
            answer_content[i].option_number.includes(opt.option_number),
          )
        ) {
          this.logger.error(
            `${currentQuestion.question_number}번 문항의 선택 번호가 올바르지 않습니다.`,
          );
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `${currentQuestion.question_number}번 문항의 선택 번호가 올바르지 않습니다.`,
          });
        }

        // 선택지 중복 문항 검사
        if (
          currentQuestion &&
          currentQuestion.duplicate_answer === false &&
          answer_content[i].option_number.length !== 1
        ) {
          this.logger.error(
            `${currentQuestion.question_number}번 문항은 단일 답변만 허용됩니다.`,
          );
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: `${currentQuestion.question_number}번 문항은 단일 답변만 허용됩니다.`,
          });
        }
      }
      const editAnswer = await this.answerService.editAnswer(
        editAnswerDto,
        answer_id,
      );
      if (editAnswer.affected === 0) {
        this.logger.error('답변 수정에 실패했습니다.');
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: '답변 수정에 실패했습니다.' });
      }
      this.logger.log('답변 수정 완료');
      return res.status(HttpStatus.OK).json({ message: '답변 수정 완료' });
    } catch (e) {
      this.logger.error(
        `답변 수정 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '답변 수정 중에 오류가 발생했습니다.',
        error: e.message,
      });
    }
  }

  /* 답변 삭제 */
  @Delete(':answer_id/deleteAnswer')
  async deleteAnswer(
    @Param('answer_id') answer_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 답변 조회
      const answer = await this.answerService.findOneAnswer(answer_id);
      if (!answer) {
        this.logger.error('존재하지 않는 답변입니다.');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 답변입니다.' });
      } else {
        const deleteAnswer = await this.answerService.deleteAnswer(answer_id);
        if (deleteAnswer.affected === 0) {
          this.logger.error('답변 삭제에 실패했습니다.');
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: '답변 삭제에 실패했습니다.' });
        }
        this.logger.log('답변 삭제 완료');
        return res.status(HttpStatus.OK).json({ message: '답변 삭제 완료' });
      }
    } catch (e) {
      this.logger.error(
        `답변 삭제 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '답변 삭제 중에 오류가 발생했습니다.',
        error: e.message,
      });
    }
  }

  /* 답변 전체 조회 */
  @Get(':survey_id')
  async getAnswer(
    @Param('survey_id') survey_id: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 답변 전체 조회
      const answer = await this.answerService.findAllAnswer(survey_id);
      this.logger.log('답변 전체 조회 완료');
      return res.status(HttpStatus.OK).json(answer);
    } catch (e) {
      this.logger.error(
        `답변 전체 조회 중에 오류가 발생했습니다. Error: ${e.message}`,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '답변 전체 조회 중에 오류가 발생했습니다.',
        error: e.message,
      });
    }
  }
}
