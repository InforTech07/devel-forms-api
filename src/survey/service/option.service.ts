import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOptionQuestionDto } from "../dtos/option-question.dto";
import { OptionQuestion } from "../entities/option-question.entity";
import { SurveyQuestion } from "../entities/survey-question.entity";


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
        
        const option = this.optionRepository.create({
            ...createOptionQuestionDto,
            surveyQuestion: question
        });
        return this.optionRepository.save(option);
    
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