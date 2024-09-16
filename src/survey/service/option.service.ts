import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOptionQuestionDto } from "../dtos/option-question.dto";
import { OptionQuestion } from "../entities/option-question.entity";
import { SurveyQuestion } from "../entities/survey-question.entity";
import { QuestionType } from "../dtos/survey-question.dto";


@Injectable()
export class OptionQuestionService {
  constructor(
    @InjectRepository(OptionQuestion)
    private optionRepository: Repository<OptionQuestion>,
    @InjectRepository(SurveyQuestion)
    private surveyQuestionRepository: Repository<SurveyQuestion>
  ) {}

  async createOptionQuestion(createOptionQuestionDto: CreateOptionQuestionDto): Promise<OptionQuestion> {

    const idQuestion = createOptionQuestionDto.surveyQuestionId;
    const question = await this.surveyQuestionRepository.findOne({ where: { id: idQuestion } });

    if (!question) {
      throw new NotFoundException('Question not found');
    }
    console.log(question);

    switch (question.type) {
        case QuestionType.TEXT:
            const newOption = this.optionRepository.create({
                ...createOptionQuestionDto,
                isCorrect: true,
                disabledText: false,
                disabledDate: true,
                disabledNumber: true,
                isOnlyOption: true,
                surveyQuestion: question
            });
            return this.optionRepository.save(newOption);
        case QuestionType.DATE:
            const newOption2 = this.optionRepository.create({
                ...createOptionQuestionDto,
                isCorrect: true,
                disabledText: true,
                disabledDate: false,
                disabledNumber: true,
                isOnlyOption: true,
                surveyQuestion: question
            });
            return this.optionRepository.save(newOption2);
        case QuestionType.NUMBER:
            const newOption3 = this.optionRepository.create({
                ...createOptionQuestionDto,
                isCorrect: true,
                disabledText: true,
                disabledDate: true,
                disabledNumber: false,
                isOnlyOption: true,
                surveyQuestion: question
            });
            return this.optionRepository.save(newOption3);
        case QuestionType.SINGLE_CHOICE:
            const newOption4 = this.optionRepository.create({
                ...createOptionQuestionDto,
                disabledText: true,
                disabledDate: true,
                disabledNumber: true,
                isOnlyOption: true,
                surveyQuestion: question
            });
            return this.optionRepository.save(newOption4);
        case QuestionType.MULTIPLE_CHOICE:
            const newOption5 = this.optionRepository.create({
                ...createOptionQuestionDto,
                disabledText: true,
                disabledDate: true,
                disabledNumber: true,
                isOnlyOption: false,
                surveyQuestion: question
            });
            return this.optionRepository.save(newOption5);
        default:
            throw new Error('Invalid question type');
        }
    }

    async updateOptionQuestion(id: number, updateOptionDto: Partial<CreateOptionQuestionDto>): Promise<OptionQuestion> {
        const option = await this.optionRepository.findOne({ where: { id } });
        if (!option) {
            throw new NotFoundException('Option not found');
        }
        Object.assign(option, updateOptionDto);
        return this.optionRepository.save(option);
    }

    async deleteOptionQuestion(id: number): Promise<void> {
        await this.optionRepository.delete(id);
    }



//   async getOptionsByQuestionId(questionId: number): Promise<Option[]> {
//     return this.optionRepository.find({ where: { questionId } });
//   }

//   async getOptionsByQuestionIds(questionIds: number[]): Promise<Option[]> {
//     return this.optionRepository.find({ where: { questionId: In(questionIds) } });
//   }
}