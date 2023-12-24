import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FormCreateTaskComponent } from './form-create-task.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { TaskService } from 'src/app/services/task.service';
import { of, throwError } from 'rxjs';

describe('FormCreateTaskComponent', () => {
  let component: FormCreateTaskComponent;
  let fixture: ComponentFixture<FormCreateTaskComponent>;
  let taskService2: TaskService;
  let taskService: jasmine.SpyObj<TaskService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['createTask']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      declarations: [FormCreateTaskComponent],
      imports: [HttpClientModule, MatSnackBarModule],
      providers: [
        TaskService,
        { provide: TaskService, useValue: taskService },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCreateTaskComponent);
    component = fixture.componentInstance;
    taskService2 = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should due date correctly updated', () => {
    const mockDate = new Date('2023-01-01');
    const mockEvent: MatDatepickerInputEvent<Date, unknown> = {
      value: mockDate,
      target: {} as any, // Adicione esta linha para satisfazer o tipo
      targetElement: {} as any, // Adicione esta linha para satisfazer o tipo
    };
    component.addEvent(mockEvent);

    const expectedDueDate = moment(mockDate).format('YYYY-MM-DD');
    expect(component.task.dueDate).toBe(expectedDueDate);
  });

  it('Should create task correctly', fakeAsync(() => {
    taskService.createTask.and.returnValue(
      of({ title: '', description: '', dueDate: '' })
    );

    component.task.title = 'teste';
    component.task.description = 'teste';
    component.task.dueDate = '2023-12-12';

    component.date = moment();

    const updateListSpy = spyOn(component, 'updateList');

    component.createTask();

    tick();
    fixture.detectChanges();

    expect(updateListSpy).toHaveBeenCalled();
    expect(component.task.title).toBe('');
    expect(component.task.description).toBe('');
    expect(component.task.dueDate).toBe('');
    expect(component.date).toBeNull();
  }));

  it('should show snackbar message on 400 status error', fakeAsync(() => {
    const errorResponse = { status: 400 };
    taskService.createTask.and.returnValue(throwError(errorResponse));
    spyOn(component, 'updateList');

    component.createTask();

    tick();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Informações incorretas! Ajuste os dados ou entre com outras informações.',
      'OK',
      jasmine.any(Object)
    );
    expect(component.updateList).not.toHaveBeenCalled();
  }));

  it('should show snackbar message on 500 status error', fakeAsync(() => {
    const errorResponse = { status: 500 };
    taskService.createTask.and.returnValue(throwError(errorResponse));
    spyOn(component, 'updateList');

    component.createTask();

    tick();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Ocorreu um erro no servidor!',
      'OK',
      jasmine.any(Object)
    );
    expect(component.updateList).not.toHaveBeenCalled();
  }));
});
