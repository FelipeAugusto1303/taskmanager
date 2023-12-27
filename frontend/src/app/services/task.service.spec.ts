import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task, ConcludedTask } from '../interfaces/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of tasks', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'task1',
        dueDate: '2023-12-24',
        concluded: false,
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'task2',
        dueDate: '2023-12-24',
        concluded: true,
      },
    ];

    service.listTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should get a single task by ID', () => {
    const mockTask: Task = {
      id: '1',
      title: 'Task 1',
      description: 'task1',
      dueDate: '2023-12-24',
      concluded: false,
    };

    service.getTask('1').subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should create a new task', () => {
    const mockTask: Task = {
      id: '1',
      title: 'Task 1',
      description: 'task1',
      dueDate: '2023-12-24',
      concluded: false,
    };

    service.createTask(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/');
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
  });

  it('should update an existing task', () => {
    const mockTask: Task = {
      id: '1',
      title: 'Updated Task 1',
      description: 'task1',
      dueDate: '2023-12-24',
      concluded: false,
    };

    service.updateTask(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockTask);
  });

  it('should conclude a task', () => {
    const taskId = '1';

    service.concludeTask(taskId).subscribe((task) => {
      expect(task.id).toEqual(taskId);
      expect(task.concluded).toBeTruthy();
      expect(task.concludedAt).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush({ id: taskId, concluded: true, concludedAt: '2023-12-01' });
  });

  it('should delete a task', () => {
    const taskId = '1';

    service.deleteTask(taskId).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get total concluded tasks by day', () => {
    const mockConcludedTasks: ConcludedTask[] = [
      { day: '2023-12-01', total_tasks: 5 },
      { day: '2023-12-02', total_tasks: 8 },
    ];

    service.getTotalConcludedByDay().subscribe((tasks) => {
      expect(tasks).toEqual(mockConcludedTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/log');
    expect(req.request.method).toBe('GET');
    req.flush(mockConcludedTasks);
  });
});
