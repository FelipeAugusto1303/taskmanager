import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick,
} from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: Router;
  let matDialog: MatDialog;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['deleteTask']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        TaskService,
        { provide: TaskService, useValue: taskService },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should formatedDueDate correctly', () => {
    component.task.dueDate = '2023-12-12';

    component.ngOnInit();

    expect(component.formatedDueDate).toBe('12/12/2023');
  });

  it('should initialize updateList and updateChart functions', () => {
    expect(component.updateList).toBeDefined();
    expect(component.updateChart).toBeDefined();
  });

  it('should initialize updateList and updateChart as functions', () => {
    expect(typeof component.updateList).toEqual('function');
    expect(typeof component.updateChart).toEqual('function');
  });

  it('should call delete', () => {
    const deleteTaskSpy = spyOn(component, 'deleteTask').and.callThrough();

    component.deleteTask();

    expect(deleteTaskSpy).toHaveBeenCalled();
  });

  it('Should after delete call updateList and updateChart', fakeAsync(() => {
    component.task.id = 'some-id';

    taskService.deleteTask.and.returnValue(
      of({ title: '', description: '', dueDate: '' })
    );

    const updateListSpy = spyOn(component, 'updateList');
    const updateChartSpy = spyOn(component, 'updateChart');

    component.deleteTask();

    tick();
    fixture.detectChanges();

    expect(updateListSpy).toHaveBeenCalled();
    expect(updateChartSpy).toHaveBeenCalled();
  }));

  it('should show snackbar message on 404 status error', fakeAsync(() => {
    const errorResponse = { status: 404 };
    component.task.id = '123';
    const updateListSpy = spyOn(component, 'updateList');

    taskService.deleteTask.and.returnValue(throwError(errorResponse));

    component.deleteTask();

    tick();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Tarefa não encontrada! verifique as informações.',
      'OK',
      jasmine.any(Object)
    );
    expect(updateListSpy).not.toHaveBeenCalled();
  }));

  it('should show snackbar message on 500 status error', fakeAsync(() => {
    const errorResponse = { status: 500 };
    component.task.id = '123';
    const updateListSpy = spyOn(component, 'updateList');

    taskService.deleteTask.and.returnValue(throwError(errorResponse));

    component.deleteTask();

    tick();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Ocorreu um erro no servidor!',
      'OK',
      jasmine.any(Object)
    );
    expect(updateListSpy).not.toHaveBeenCalled();
  }));

  it('Should navigate correctly', () => {
    spyOn(router, 'navigate');
    component.task.id = '123';

    component.openTask();

    expect(router.navigate).toHaveBeenCalledWith(['/details/123']);
  });

  // it('should open dialog and call updateList on dialog close', fakeAsync(() => {
  //   const openSpy = spyOn(matDialog, 'open').and.callThrough();
  //   const updateListSpy = spyOn(component, 'updateList');

  //   component.openDialog();

  //   expect(openSpy).toHaveBeenCalled();

  //   const dialogRef = openSpy.calls.mostRecent().returnValue;
  //   const afterClosedSpy = spyOn(dialogRef, 'afterClosed').and.callThrough();
  //   const closeSpy = spyOn(dialogRef, 'close').and.callThrough();

  //   dialogRef.close();

  //   tick();
  //   flushMicrotasks();
  //   fixture.detectChanges();
  //   expect(closeSpy).toHaveBeenCalled();

  //   expect(afterClosedSpy).toHaveBeenCalled();

  //   // Certifique-se de que updateList foi chamado após as operações assíncronas
  //   expect(updateListSpy).toHaveBeenCalled();
  // }));
});
