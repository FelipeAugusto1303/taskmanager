import { Test, TestingModule } from '@nestjs/testing';
import { TimeSpentController } from './time-spent.controller';
import { TimeSpentService } from './time-spent.service';
import { TaskHour, TimeSpent } from './entities/timeSpent.entity';
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

const timeSpentHours: TaskHour[] = [
  new TaskHour({
    spentAt: '2023-12-12',
    hours: 10,
  }),
  new TaskHour({
    spentAt: '2023-12-13',
    hours: 10,
  }),
  new TaskHour({
    spentAt: '2023-12-14',
    hours: 10,
  }),
];

const newTimeSpent: TimeSpent = new TimeSpent({
  id: '3',
  comment: 'teste',
  timeSpent: 1,
  spentAt: '2023-12-24',
});
const updatedTimeSpent: TimeSpent = new TimeSpent({
  id: '3',
  comment: 'teste',
  timeSpent: 1,
  spentAt: '2023-12-24',
});

describe('TimeSpentController', () => {
  let timeController: TimeSpentController;
  let timeService: TimeSpentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSpentController],
      providers: [
        {
          provide: TimeSpentService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(timeSpentList),
            findHours: jest.fn().mockResolvedValue(timeSpentHours),
            findAllLogs: jest.fn().mockResolvedValue(timeSpentList),
            findOne: jest.fn().mockResolvedValue(timeSpentList[0]),
            create: jest.fn().mockResolvedValue(newTimeSpent),
            update: jest.fn().mockResolvedValue(updatedTimeSpent),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    timeController = module.get<TimeSpentController>(TimeSpentController);
    timeService = module.get<TimeSpentService>(TimeSpentService);
  });

  it('should be defined', () => {
    expect(timeController).toBeDefined();
    expect(timeService).toBeDefined();
  });

  it('should findAll timespents', async () => {
    const result = await timeController.findAll();

    expect(result).toEqual(timeSpentList);
    expect(timeService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an error in findAll', () => {
    jest.spyOn(timeService, 'findAll').mockRejectedValueOnce(new Error());

    expect(timeController.findAll()).rejects.toThrowError();
  });

  it('should find hours of some user', async () => {
    const result = await timeController.findHours('1');

    expect(result).toEqual(timeSpentHours);
    expect(timeService.findHours).toHaveBeenCalledTimes(1);
    expect(timeService.findHours).toHaveBeenCalledWith('1');
  });

  it('should throw an error when tries to find hours', () => {
    jest.spyOn(timeService, 'findHours').mockRejectedValueOnce(new Error());

    expect(timeController.findHours('1')).rejects.toThrowError();
  });

  it('should find all logs of an user', async () => {
    const result = await timeController.findAllLogs('1');

    expect(result).toEqual(timeSpentList);
    expect(timeService.findAllLogs).toHaveBeenCalledTimes(1);
    expect(timeService.findAllLogs).toHaveBeenCalledWith('1');
  });

  it('should throw error when tries to find logs', () => {
    jest.spyOn(timeService, 'findAllLogs').mockRejectedValueOnce(new Error());

    expect(timeController.findAllLogs('1')).rejects.toThrowError();
  });

  it('should find one log', async () => {
    const result = await timeController.findOne('1');

    expect(result).toEqual(timeSpentList[0]);
    expect(timeService.findOne).toHaveBeenCalledTimes(1);
    expect(timeService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throws an error when findOne', () => {
    jest.spyOn(timeService, 'findOne').mockRejectedValueOnce(new Error());

    expect(timeController.findOne('1')).rejects.toThrowError();
  });

  it('should create a new log', async () => {
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

    const result = await timeController.create(body);
    expect(result).toEqual(newTimeSpent);
    expect(timeService.create).toHaveBeenCalledTimes(1);
    expect(timeService.create).toHaveBeenCalledWith(body);
  });

  it('should throw an error when create a new log', () => {
    jest.spyOn(timeService, 'create').mockRejectedValueOnce(new Error());

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

    expect(timeController.create(body)).rejects.toThrowError();
  });

  it('should update a task', async () => {
    const body: UpdateTimeSpentDTO = {
      comment: 'teste',
      timeSpent: 1,
      spentAt: '2023-12-24',
    };

    const result = await timeController.update('3', body);

    expect(result).toEqual(updatedTimeSpent);
    expect(timeService.update).toHaveBeenCalledTimes(1);
    expect(timeService.update).toHaveBeenCalledWith('3', body);
  });

  it('should throw an error when updates', () => {
    jest.spyOn(timeService, 'update').mockRejectedValueOnce(new Error());

    const body: UpdateTimeSpentDTO = {
      comment: 'teste',
      timeSpent: 1,
      spentAt: '2023-12-24',
    };

    expect(timeController.update('3', body)).rejects.toThrowError();
  });

  it('should remove a task', async () => {
    const result = await timeController.remove('3');

    expect(result).toBeUndefined();
    expect(timeService.remove).toHaveBeenCalledTimes(1);
    expect(timeService.remove).toHaveBeenCalledWith('3');
  });

  it('should throw an error when remove a task', () => {
    jest.spyOn(timeService, 'remove').mockRejectedValueOnce(new Error());

    expect(timeController.remove('3')).rejects.toThrowError();
  });
});
