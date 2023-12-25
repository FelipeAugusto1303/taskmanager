import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tasks } from './entities/tasks.entity';
import { TimeSpent } from '../time-spent/entities/timeSpent.entity';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  HttpVersionNotSupportedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

const taskEntityList: Tasks[] = [
  new Tasks({
    id: '1',
    title: 'teste',
    description: 'teste',
    dueDate: '2023-12-24',
    concluded: false,
    concludedAt: null,
  }),
  new Tasks({
    id: '2',
    title: 'teste',
    description: 'teste',
    dueDate: '2023-12-24',
    concluded: false,
    concludedAt: null,
  }),
  new Tasks({
    id: '3',
    title: 'teste',
    description: 'teste',
    dueDate: '2023-12-24',
    concluded: false,
    concludedAt: null,
  }),
];

const taskEntity = new Tasks({
  id: '3',
  title: 'teste',
  description: 'teste',
  dueDate: '2023-12-24',
  concluded: false,
  concludedAt: null,
});

const newTaskEntity: Tasks = new Tasks({
  title: 'teste',
  description: 'test description',
  dueDate: '2023-12-24',
  concluded: false,
  concludedAt: null,
});

describe('TasksService', () => {
  let taskService: TasksService;
  let taskRepository: Repository<Tasks>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Tasks),
          useValue: {
            find: jest.fn().mockResolvedValue(taskEntityList),
            findOne: jest.fn().mockResolvedValue(taskEntity),
            save: jest.fn().mockResolvedValue(newTaskEntity),
            preload: jest.fn().mockResolvedValue(taskEntity),
            create: jest.fn().mockResolvedValue(newTaskEntity),
          },
        },
        {
          provide: getRepositoryToken(TimeSpent),
          useValue: {},
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should return a task list entity', async () => {
    const result = await taskService.findAll();

    expect(result).toEqual(taskEntityList);
    expect(taskRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when findAll', () => {
    jest.spyOn(taskRepository, 'find').mockRejectedValueOnce(new Error());

    expect(taskService.findAll()).rejects.toThrowError();
  });

  it('should find one task', async () => {
    const result = await taskService.findOne('3');

    expect(result).toEqual(taskEntity);
    expect(taskRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when findOne', () => {
    jest
      .spyOn(taskRepository, 'findOne')
      .mockRejectedValueOnce(
        new HttpException('message', HttpStatus.NOT_FOUND),
      );

    expect(taskService.findOne('3')).rejects.toThrowError(
      new HttpException('message', HttpStatus.NOT_FOUND),
    );
  });

  it('should create a task', async () => {
    const body: CreateTaskDTO = {
      title: 'teste',
      description: 'test description',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };
    const result = await taskService.create(body);

    expect(result).toEqual(newTaskEntity);
    expect(taskRepository.create).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledTimes(1);
    expect(taskRepository.create).toHaveBeenCalledWith(body);
  });

  it('should throw an exeception when create a task', () => {
    jest.spyOn(taskRepository, 'save').mockRejectedValueOnce(new Error());

    const body: CreateTaskDTO = {
      title: 'teste',
      description: 'test description',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };

    expect(taskService.create(body)).rejects.toThrowError();
  });

  it('should update a task', async () => {
    const body: UpdateTaskDTO = {
      title: 'teste',
      description: 'teste',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };
    const result = await taskService.update('3', body);

    expect(result).toEqual(newTaskEntity);
    expect(taskRepository.preload).toHaveBeenCalledTimes(1);
    expect(taskRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throws an error when update', () => {
    jest
      .spyOn(taskRepository, 'preload')
      .mockRejectedValueOnce(
        new HttpException('message', HttpStatus.NOT_FOUND),
      );

    const body: UpdateTaskDTO = {
      title: 'teste',
      description: 'teste',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };
    expect(taskService.update('3', body)).rejects.toThrowError(
      new HttpException('message', HttpStatus.NOT_FOUND),
    );
  });
});
