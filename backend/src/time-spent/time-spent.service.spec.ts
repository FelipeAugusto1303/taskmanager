import { Test, TestingModule } from '@nestjs/testing';
import { TimeSpentService } from './time-spent.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TimeSpent } from './entities/timeSpent.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateTimeSpentDTO } from './dto/create-time-spent.dto';
import { Tasks } from '../tasks/entities/tasks.entity';
import { UpdateTimeSpentDTO } from './dto/update-time-spent.dto';

const timeSpentList: TimeSpent[] = [
  new TimeSpent({
    id: '1',
    comment: 'teste',
    timeSpent: 1,
    spentAt: '2023-12-24',
  }),
  new TimeSpent({
    id: '2',
    comment: 'teste',
    timeSpent: 1,
    spentAt: '2023-12-24',
  }),
  new TimeSpent({
    id: '3',
    comment: 'teste',
    timeSpent: 1,
    spentAt: '2023-12-24',
  }),
];

const timeSpent: TimeSpent = new TimeSpent({
  id: '3',
  comment: 'teste',
  timeSpent: 1,
  spentAt: '2023-12-24',
});

const newTimeSpent: TimeSpent = new TimeSpent({
  comment: 'teste',
  timeSpent: 1,
  spentAt: '2023-12-24',
});

describe('TimeSpentService', () => {
  let timeService: TimeSpentService;
  let timeRepository: Repository<TimeSpent>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeSpentService,
        {
          provide: getRepositoryToken(TimeSpent),
          useValue: {
            find: jest.fn().mockResolvedValue(timeSpentList),
            findOne: jest.fn().mockResolvedValue(timeSpent),
            save: jest.fn().mockResolvedValue(newTimeSpent),
            preload: jest.fn().mockResolvedValue(timeSpent),
            create: jest.fn().mockResolvedValue(newTimeSpent),
            remove: jest.fn().mockResolvedValue(timeSpent),
          },
        },
      ],
    }).compile();

    timeService = module.get<TimeSpentService>(TimeSpentService);
    timeRepository = module.get<Repository<TimeSpent>>(
      getRepositoryToken(TimeSpent),
    );
  });

  it('should be defined', () => {
    expect(timeService).toBeDefined();
    expect(timeRepository).toBeDefined();
  });

  it('should return a list of time spents', async () => {
    const result = await timeService.findAll();

    expect(result).toEqual(timeSpentList);
    expect(timeRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when findAll', () => {
    jest.spyOn(timeRepository, 'find').mockRejectedValueOnce(new Error());

    expect(timeService.findAll()).rejects.toThrowError();
  });

  it('should findOne timespent', async () => {
    const result = await timeService.findOne('3');

    expect(result).toEqual(timeSpent);
    expect(timeRepository.findOne).toHaveBeenCalledTimes(1);
    expect(timeRepository.findOne).toHaveBeenCalledWith({ where: { id: '3' } });
  });

  it('should throw an exception when find one time spent', () => {
    jest
      .spyOn(timeRepository, 'findOne')
      .mockRejectedValueOnce(
        new HttpException('message', HttpStatus.NOT_FOUND),
      );

    expect(timeService.findOne('3')).rejects.toThrowError(
      new HttpException('message', HttpStatus.NOT_FOUND),
    );
  });

  it('should create a time spent', async () => {
    const body: CreateTimeSpentDTO = {
      comment: 'teste',
      timeSpent: 1,
      spentAt: '2023-12-24',
      task: new Tasks({
        id: '3',
        title: 'teste',
        description: 'teste',
        dueDate: '2023-12-24',
        concluded: false,
        concludedAt: null,
      }),
    };

    const result = await timeService.create(body);

    expect(result).toEqual(newTimeSpent);
    expect(timeRepository.create).toHaveBeenCalledTimes(1);
    expect(timeRepository.create).toHaveBeenCalledWith(body);
    expect(timeRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when create a time spent', () => {
    jest.spyOn(timeRepository, 'save').mockRejectedValueOnce(new Error());

    const body: CreateTimeSpentDTO = {
      comment: 'teste',
      timeSpent: 1,
      spentAt: '2023-12-24',
      task: new Tasks({
        id: '3',
        title: 'teste',
        description: 'teste',
        dueDate: '2023-12-24',
        concluded: false,
        concludedAt: null,
      }),
    };

    expect(timeService.create(body)).rejects.toThrowError();
  });

  it('should update a time spent', async () => {
    const body: UpdateTimeSpentDTO = {
      comment: 'teste',
      timeSpent: 1,
      spentAt: '2023-12-24',
    };

    const result = await timeService.update('3', body);

    expect(result).toEqual(newTimeSpent);
    expect(timeRepository.preload).toHaveBeenCalledTimes(1);
    expect(timeRepository.preload).toHaveBeenCalledWith({ ...body, id: '3' });
    expect(timeRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when update a time spent', () => {
    jest
      .spyOn(timeRepository, 'preload')
      .mockRejectedValueOnce(
        new HttpException('message', HttpStatus.NOT_FOUND),
      );

    const body: UpdateTimeSpentDTO = {
      comment: 'teste',
      timeSpent: 1,
      spentAt: '2023-12-24',
    };

    expect(timeService.update('3', body)).rejects.toThrowError(
      new HttpException('message', HttpStatus.NOT_FOUND),
    );
  });

  it('should remove a time spent', async () => {
    const result = await timeService.remove('3');

    expect(result).toEqual(timeSpent);
    expect(timeRepository.findOne).toHaveBeenCalledTimes(1);
    expect(timeRepository.findOne).toHaveBeenCalledWith({ where: { id: '3' } });
    expect(timeRepository.remove).toHaveBeenCalledTimes(1);
    expect(timeRepository.remove).toHaveBeenCalledWith(timeSpent);
  });

  it('should throw an exception when remove', () => {
    jest
      .spyOn(timeRepository, 'findOne')
      .mockRejectedValueOnce(
        new HttpException('message', HttpStatus.NOT_FOUND),
      );

    expect(timeService.remove('3')).rejects.toThrowError(
      new HttpException('message', HttpStatus.NOT_FOUND),
    );
  });
});
