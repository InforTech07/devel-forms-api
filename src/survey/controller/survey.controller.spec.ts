import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './survey.controller';
import { SurveyService } from '../service/survey.service';
import { Survey } from '../entities/survey.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateSurveyDto, UpdateSurveyDto } from '../dtos/survey.dto';

describe('SurveyController', () => {
  let controller: SurveyController;

  const mockSurveyService = {
    createSurvey: jest.fn(),
    updateSurvey: jest.fn(),
    getAllSurveys: jest.fn(),
    getSurveyById: jest.fn(),
    deleteSurvey: jest.fn(),
    getSurveyByToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [
        {
          provide: SurveyService,
          useValue: mockSurveyService,
        },
      ],
    }).compile();

    controller = module.get<SurveyController>(SurveyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSurvey', () => {
    it('should create a survey', async () => {
      const createSurveyDto: CreateSurveyDto = { name: 'New Survey' };
      const userId = 1;
      const result: Survey = { id: 1, ...createSurveyDto, token: 'token', createdBy: null, updatedBy: null, createdAt: new Date(), updatedAt: new Date(), isActive: true } as Survey;
      mockSurveyService.createSurvey.mockResolvedValue(result);

      expect(await controller.createSurvey(createSurveyDto, { user: { userId } })).toBe(result);
      expect(mockSurveyService.createSurvey).toHaveBeenCalledWith(createSurveyDto, userId);
    });
  });

  describe('updateSurvey', () => {
    it('should update a survey', async () => {
      const id = 1;
      const updateSurveyDto: UpdateSurveyDto = { name: 'Updated Survey' };
      const userId = 1;
      const result: Survey = { id, ...updateSurveyDto, token: 'token', createdBy: null, updatedBy: null, createdAt: new Date(), updatedAt: new Date(), isActive: true } as Survey;
      mockSurveyService.updateSurvey.mockResolvedValue(result);

      expect(await controller.updateSurvey(id, updateSurveyDto, { user: { userId } })).toBe(result);
      expect(mockSurveyService.updateSurvey).toHaveBeenCalledWith(id, updateSurveyDto, userId);
    });
  });

  describe('getAllSurveys', () => {
    it('should return all surveys', async () => {
      const userId = 1;
      const result: Survey[] = [{ id: 1, name: 'Survey 1', token: 'token1', createdBy: null, updatedBy: null, createdAt: new Date(), updatedAt: new Date(), isActive: true }] as Survey[];
      mockSurveyService.getAllSurveys.mockResolvedValue(result);

      expect(await controller.getAllSurveys({ user: { userId } })).toBe(result);
      expect(mockSurveyService.getAllSurveys).toHaveBeenCalledWith(userId);
    });
  });

  describe('getSurveyById', () => {
    it('should return a survey by id', async () => {
      const id = 1;
      const result: Survey = { id, name: 'Survey', token: 'token', createdBy: null, updatedBy: null, createdAt: new Date(), updatedAt: new Date(), isActive: true } as Survey;
      mockSurveyService.getSurveyById.mockResolvedValue(result);

      expect(await controller.getSurveyById(id)).toBe(result);
      expect(mockSurveyService.getSurveyById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if survey not found', async () => {
      const id = 1;
      mockSurveyService.getSurveyById.mockResolvedValue(null);

      await expect(controller.getSurveyById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a survey', async () => {
      const id = 1;
      mockSurveyService.deleteSurvey.mockResolvedValue(undefined);

      expect(await controller.remove(id)).toBeUndefined();
      expect(mockSurveyService.deleteSurvey).toHaveBeenCalledWith(id);
    });
  });

  describe('getSurveyByToken', () => {
    it('should return a survey by token', async () => {
      const token = 'token123';
      const result: Survey = { id: 1, name: 'Survey', token, createdBy: null, updatedBy: null, createdAt: new Date(), updatedAt: new Date(), isActive: true } as Survey;
      mockSurveyService.getSurveyByToken.mockResolvedValue(result);

      expect(await controller.getSurveyByToken(token)).toBe(result);
      expect(mockSurveyService.getSurveyByToken).toHaveBeenCalledWith(token);
    });

    it('should throw NotFoundException if survey not found by token', async () => {
      const token = 'token123';
      mockSurveyService.getSurveyByToken.mockResolvedValue(null);

      await expect(controller.getSurveyByToken(token)).rejects.toThrow(NotFoundException);
    });
  });
});
