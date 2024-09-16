import { Controller, Post, Body, Param, Put, ParseIntPipe, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OptionQuestionService } from "../service/option.service";
import { CreateOptionQuestionDto } from "../dtos/option-question.dto";
import { OptionQuestion} from "../entities/option-question.entity";

@ApiTags("option")
@Controller("option")
export class OptionQuestionController {
    constructor(private readonly optionQuestionService: OptionQuestionService) {}

    // Create option
    @Post('/add-option-question')
    async createOptionQuestion(
        @Body() createOptionDto: CreateOptionQuestionDto,
    ): Promise<OptionQuestion> {
        return this.optionQuestionService.createOptionQuestion(createOptionDto);
    }

    // Update option
    @Put(':id/update-option-question')
    async updateOptionQuestion(
        @Param('id') id: number,
        @Body() updateOptionDto: Partial<CreateOptionQuestionDto>,
    ): Promise<OptionQuestion> {
        return this.optionQuestionService.updateOptionQuestion(id, updateOptionDto);
    }

    // delete option
    @Delete(':id/delete-option')
    async deleteOption(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.optionQuestionService.deleteOptionQuestion(id);
    }

}