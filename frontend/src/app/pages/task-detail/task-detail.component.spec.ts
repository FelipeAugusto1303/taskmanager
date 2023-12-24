import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TaskDetailComponent } from './task-detail.component';
import { TaskService } from 'src/app/services/task.service';
import { TimeSpentService } from 'src/app/services/time-spent.service';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let spentServiceSpy: jasmine.SpyObj<TimeSpentService>;

  beforeEach(() => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTask']);
    spentServiceSpy = jasmine.createSpyObj('TimeSpentService', [
      'getSpentHours',
    ]);

    TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: TimeSpentService, useValue: spentServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task and chart on ngOnInit', () => {
    const task = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '',
      concluded: false,
      concludedAt: '',
    };
    const hours = [{ timeSpent_spentAt: '2023-12-01', hours: 5 }];

    taskServiceSpy.getTask.and.returnValue(of(task));
    spentServiceSpy.getSpentHours.and.returnValue(of(hours));

    fixture.detectChanges();

    expect(component.task).toEqual(task);
    expect(component.hoursTask).toEqual(hours);
    // You can add more expectations for the chart if needed
  });

  it('should update task on updateTask', () => {
    const task = {
      id: '1',
      title: 'Updated Task',
      description: 'Updated Description',
      dueDate: '',
      concluded: true,
      concludedAt: '2023-12-01',
    };

    taskServiceSpy.getTask.and.returnValue(of(task));

    component.updateTask();

    expect(component.task).toEqual(task);
  });

  it('should update chart on updateChart', () => {
    const hours = [{ timeSpent_spentAt: '2023-12-01', hours: 8 }];

    spentServiceSpy.getSpentHours.and.returnValue(of(hours));

    component.updateChart();

    expect(component.hoursTask).toEqual(hours);
    // You can add more expectations for the chart if needed
  });

  // Add more tests as needed
});
