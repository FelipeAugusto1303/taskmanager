import { Test, TestingModule } from '@nestjs/testing';
import { TimeSpentService } from './time-spent.service';

describe('TimeSpentService', () => {
  let service: TimeSpentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeSpentService],
    }).compile();

    service = module.get<TimeSpentService>(TimeSpentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
