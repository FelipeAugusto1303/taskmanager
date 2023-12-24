import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', [
      'listTasks',
      'getTotalConcludedByDay',
    ]);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task list and chart on ngOnInit', () => {
    const tasks = [
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
    const chartData = [{ day: '2023-12-01', total_hours: 5 }];

    taskServiceSpy.listTasks.and.returnValue(of(tasks));
    taskServiceSpy.getTotalConcludedByDay.and.returnValue(of(chartData));

    fixture.detectChanges();

    expect(component.taskList).toEqual(tasks.filter((t) => !t.concluded));
    expect(component.concludedList).toEqual(tasks.filter((t) => t.concluded));
    expect(component.chartData).toEqual(chartData);
    // You can add more expectations for the chart if needed
  });

  it('should update task list on updateTaskList', () => {
    const tasks = [
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

    taskServiceSpy.listTasks.and.returnValue(of(tasks));

    component.updateTaskList();

    expect(component.taskList).toEqual(tasks.filter((t) => !t.concluded));
    expect(component.concludedList).toEqual(tasks.filter((t) => t.concluded));
  });

  it('should update chart on updateChart', () => {
    const chartData = [{ day: '2023-12-01', total_hours: 8 }];

    taskServiceSpy.getTotalConcludedByDay.and.returnValue(of(chartData));

    component.updateChart();

    expect(component.chartData).toEqual(chartData);
  });
});
