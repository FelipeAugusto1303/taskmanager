import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { TaskInfoComponent } from './task-info.component';
import { TaskService } from 'src/app/services/task.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChanges } from '@angular/core';

describe('TaskInfoComponent', () => {
  let component: TaskInfoComponent;
  let fixture: ComponentFixture<TaskInfoComponent>;
  let taskService: TaskService;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [TaskService, MatSnackBar, MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInfoComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    snackBar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTask and navigate on success', fakeAsync(() => {
    component.task.id = '123';

    spyOn(taskService, 'deleteTask').and.returnValue(
      of({ title: '', description: '', dueDate: '' })
    );
    spyOn(router, 'navigate');
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.deleteTask();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should show snackbar on 404 error in deleteTask', fakeAsync(() => {
    component.task.id = '123';
    const errorMessage = 'Tarefa não encontrada! Verifique as informações.';
    spyOn(taskService, 'deleteTask').and.returnValue(
      throwError({ status: 404 })
    );
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.deleteTask();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).toHaveBeenCalledWith(errorMessage, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }));

  it('should show snackbar on 500 error in deleteTask', fakeAsync(() => {
    component.task.id = '123';
    const errorMessage = 'Ocorreu um erro no servidor!';
    spyOn(taskService, 'deleteTask').and.returnValue(
      throwError({ status: 500 })
    );
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.deleteTask();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).toHaveBeenCalledWith(errorMessage, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }));

  it('should call concludeTask and updateTask on success', fakeAsync(() => {
    component.task.id = '123';

    const concludeTaskSpy = spyOn(
      TestBed.inject(TaskService),
      'concludeTask'
    ).and.returnValue(of({ title: '', description: '', dueDate: '' }));
    const updateTaskSpy = spyOn(component, 'updateTask');

    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.concludeTask();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).not.toHaveBeenCalled();
    expect(concludeTaskSpy).toHaveBeenCalled();

    expect(updateTaskSpy).toHaveBeenCalled();
  }));

  it('should show snackbar on 404 error in concludeTask', fakeAsync(() => {
    component.task.id = '123';

    const errorMessage = 'Tarefa não encontrada! Verifique as informações.';
    spyOn(taskService, 'concludeTask').and.returnValue(
      throwError({ status: 404 })
    );
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.concludeTask();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).toHaveBeenCalledWith(errorMessage, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }));

  it('should show snackbar on 500 error in concludeTask', fakeAsync(() => {
    component.task.id = '123';

    const errorMessage = 'Ocorreu um erro no servidor!';
    spyOn(taskService, 'concludeTask').and.returnValue(
      throwError({ status: 500 })
    );
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.concludeTask();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).toHaveBeenCalledWith(errorMessage, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }));

  it('should call updateDate and updateConcludedDate on task change', () => {
    const updateDateSpy = spyOn<TaskInfoComponent, 'updateDate'>(
      component,
      'updateDate'
    ).and.callThrough();
    const updateConcludedDateSpy = spyOn<
      TaskInfoComponent,
      'updateConcludedDate'
    >(component, 'updateConcludedDate').and.callThrough();

    const changes: SimpleChanges = {
      task: {
        currentValue: {
          id: '1',
          title: 'Test Task',
          description: '',
          dueDate: '',
          concluded: false,
          concludedAt: '',
        },
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    };

    component.ngOnChanges(changes);

    expect(updateDateSpy).toHaveBeenCalled();
    expect(updateConcludedDateSpy).toHaveBeenCalled();
  });

  it('Should format date correctly', () => {
    component.task.dueDate = '2023-12-31';

    component.updateDate();

    expect(component.date).toBe('31/12/2023');
  });

  it('Should format concludedDate correctly', () => {
    component.task.concludedAt = '2023-12-31';

    component.updateConcludedDate();

    expect(component.concludedDate).toBe('31/12/2023');
  });

  // it('should call openDialog and updateTask on dialog close', fakeAsync(() => {
  //   spyOn(dialog, 'open').and.returnValue({
  //     afterClosed: () => of(null),
  //   } as MatDialogRef<EditModalComponent>);
  //   spyOn(component.updateTask, 'call');

  //   component.openDialog();

  //   tick();
  //   fixture.detectChanges();

  //   expect(component.updateTask.call).toHaveBeenCalled();
  // }));
});
