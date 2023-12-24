import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('EditModalComponent', () => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  let mockDialogRef: any;
  let mockTaskService: any;
  let mockSnackBar: any;

  beforeEach(() => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    mockTaskService = {
      updateTask: jasmine.createSpy('updateTask').and.returnValue(of({})),
    };

    mockSnackBar = {
      open: jasmine.createSpy('open'),
    };

    TestBed.configureTestingModule({
      declarations: [EditModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TaskService, useValue: mockTaskService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedDate and tempTask', () => {
    expect(component.selectedDate).toBeDefined();
    expect(component.tempTask).toBeDefined();
  });

  it('should update task and close dialog on updateTask success', () => {
    component.updateTask();
    expect(mockTaskService.updateTask).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should show snackbar on updateTask error with status 400', () => {
    mockTaskService.updateTask.and.returnValue(
      throwError({ status: 400, message: 'Bad Request' })
    );
    component.updateTask();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Informações incorretas! Ajuste os dados ou entre com outras informações.',
      'OK',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      }
    );
  });

  it('should show snackbar on updateTask error with status 500', () => {
    mockTaskService.updateTask.and.returnValue(
      throwError({ status: 500, message: 'Internal Server Error' })
    );
    component.updateTask();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Ocorreu um erro no servidor!',
      'OK',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      }
    );
  });

  it('should close dialog on closeDialog', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
