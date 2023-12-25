import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskLog, Tasks } from './entities/tasks.entity';
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

const taskEntity: Tasks = new Tasks({
  id: '3',
  title: 'teste',
  description: 'teste',
  dueDate: '2023-12-24',
  concluded: false,
  concludedAt: null,
});

const taskLogList: TaskLog[] = [
  new TaskLog({
    day: '2023-12-12',
    total_concluded: 10,
  }),
  new TaskLog({
    day: '2023-12-13',
    total_concluded: 15,
  }),
  new TaskLog({
    day: '2023-12-14',
    total_concluded: 30,
  }),
];

const newTaskEntity: Tasks = new Tasks({
  title: 'teste',
  description: 'test description',
  dueDate: '2023-12-24',
  concluded: false,
  concludedAt: null,
});

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(taskEntityList),
            taskLog: jest.fn().mockResolvedValue(taskLogList),
            findOne: jest.fn().mockResolvedValue(taskEntityList[0]),
            create: jest.fn().mockResolvedValue(newTaskEntity),
            update: jest.fn().mockResolvedValue(taskEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
    expect(tasksService).toBeDefined();
  });

  it('should findAll return a list of tasks', async () => {
    const result = await tasksController.findAll();

    expect(result).toEqual(taskEntityList);
  });

  it('should findAll throw an excepytion', () => {
    jest.spyOn(tasksService, 'findAll').mockRejectedValueOnce(new Error());

    expect(tasksController.findAll()).rejects.toThrowError();
  });

  it('should create a new task', async () => {
    const body: CreateTaskDTO = {
      title: 'teste',
      description: 'test description',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };

    const result = await tasksController.create(body);

    expect(result).toEqual(newTaskEntity);
    expect(tasksService.create).toHaveBeenCalledTimes(1);
    expect(tasksService.create).toHaveBeenCalledWith(body);
  });

  it('should throw an error on create', () => {
    const body: CreateTaskDTO = {
      title: 'teste',
      description: 'test description',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };

    jest.spyOn(tasksService, 'create').mockRejectedValueOnce(new Error());

    expect(tasksController.create(body)).rejects.toThrowError();
  });

  it('should findOne task', async () => {
    const result = await tasksController.findOne('1');

    expect(result).toEqual(taskEntityList[0]);
    expect(tasksService.findOne).toHaveBeenCalledTimes(1);
    expect(tasksService.findOne).toHaveBeenCalledWith('1');
  });

  it('should findOne throws an error', () => {
    jest.spyOn(tasksService, 'findOne').mockRejectedValueOnce(new Error());

    expect(tasksController.findOne('1')).rejects.toThrowError();
  });

  it('should updates a task', async () => {
    const body: UpdateTaskDTO = {
      title: 'teste',
      description: 'teste',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };

    const result = await tasksController.update('3', body);

    expect(result).toEqual(taskEntity);
    expect(tasksService.update).toHaveBeenCalledTimes(1);
    expect(tasksService.update).toHaveBeenCalledWith('3', body);
  });

  it('should throw an error on update', () => {
    jest.spyOn(tasksService, 'update').mockRejectedValueOnce(new Error());

    const body: UpdateTaskDTO = {
      title: 'teste',
      description: 'teste',
      dueDate: '2023-12-24',
      concluded: false,
      concludedAt: null,
    };

    expect(tasksController.update('3', body)).rejects.toThrowError();
  });

  it('should remove a task', async () => {
    const result = await tasksController.remove('1');

    expect(result).toBeUndefined();
    expect(tasksService.remove).toHaveBeenCalledTimes(1);
    expect(tasksService.remove).toHaveBeenCalledWith('1');
  });

  it('should throw error when remove', () => {
    jest.spyOn(tasksService, 'remove').mockRejectedValueOnce(new Error());

    expect(tasksController.remove('3')).rejects.toThrowError();
  });

  it('should return a taskLog list', async () => {
    const result = await tasksController.log();

    expect(result).toEqual(taskLogList);
    expect(tasksService.taskLog).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when tries to return a task log', () => {
    jest.spyOn(tasksService, 'taskLog').mockRejectedValueOnce(new Error());

    expect(tasksController.log()).rejects.toThrowError();
  });
});
