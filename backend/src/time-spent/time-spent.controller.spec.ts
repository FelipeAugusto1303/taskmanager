import { Test, TestingModule } from '@nestjs/testing';
import { TimeSpentController } from './time-spent.controller';

describe('TimeSpentController', () => {
  let controller: TimeSpentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSpentController],
    }).compile();

    controller = module.get<TimeSpentController>(TimeSpentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
