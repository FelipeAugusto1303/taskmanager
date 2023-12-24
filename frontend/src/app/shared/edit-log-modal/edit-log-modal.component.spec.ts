import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLogModalComponent } from './edit-log-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TimeSpentService } from 'src/app/services/time-spent.service';
import { of, throwError } from 'rxjs';
import * as moment from 'moment';

describe('EditLogModalComponent', () => {
  let component: EditLogModalComponent;
  let fixture: ComponentFixture<EditLogModalComponent>;
  let mockDialogRef: any;
  let mockSnackBar: any;
  let mockTimeSpentService: any;

  beforeEach(() => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    mockSnackBar = {
      open: jasmine.createSpy('open'),
    };

    mockTimeSpentService = {
      updateComment: jasmine.createSpy('updateComment').and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      declarations: [EditLogModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: TimeSpentService, useValue: mockTimeSpentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize properties with data', () => {
  //   const data = {
  //     timeSpent_id: '123',
  //     timeSpent_timeSpent: 5,
  //     timeSpent_comment: 'Test Comment',
  //     timeSpent_spentAt: new Date(),
  //   };

  //   // Atribua o objeto data antes de chamar o ngOnInit
  //   component.data = data;

  //   component.ngOnInit();

  //   expect(component.id).toEqual(data.timeSpent_id);
  //   expect(component.hour).toEqual(String(data.timeSpent_timeSpent));
  //   expect(component.comment).toEqual(data.timeSpent_comment);
  //   expect(component.date).toEqual(data.timeSpent_spentAt);
  // });

  it('should close dialog on closeDialog', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should update comment and close dialog on editLogRegister success', () => {
    component.editLogRegister();
    expect(mockTimeSpentService.updateComment).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should show snackbar on editLogRegister error with status 400', () => {
    mockTimeSpentService.updateComment.and.returnValue(
      throwError({ status: 400, message: 'Bad Request' })
    );
    component.editLogRegister();
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

  it('should show snackbar on editLogRegister error with status 500', () => {
    mockTimeSpentService.updateComment.and.returnValue(
      throwError({ status: 500, message: 'Internal Server Error' })
    );
    component.editLogRegister();
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

  it('should set date on addEvent', () => {
    const mockDate = new Date('2023-01-01');
    const mockEvent: MatDatepickerInputEvent<Date, unknown> = {
      value: mockDate,
      target: {} as any, // Adicione esta linha para satisfazer o tipo
      targetElement: {} as any, // Adicione esta linha para satisfazer o tipo
    };
    component.addEvent(mockEvent);

    expect(component.date).toEqual(mockDate.toISOString());
  });
});
