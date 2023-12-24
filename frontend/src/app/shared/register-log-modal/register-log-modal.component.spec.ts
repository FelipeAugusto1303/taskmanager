import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterLogModalComponent } from './register-log-modal.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { of } from 'rxjs';
import { CreateTimeSpent } from 'src/app/interfaces/timeSpent';
import { TimeSpentService } from 'src/app/services/time-spent.service';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterLogModalComponent', () => {
  let component: RegisterLogModalComponent;
  let fixture: ComponentFixture<RegisterLogModalComponent>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<RegisterLogModalComponent>>;
  let snackBar: MatSnackBar;
  let timeSpentService: TimeSpentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterLogModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: 'task_id' },
        MatSnackBar,
        TimeSpentService,
      ],
      imports: [HttpClientModule, MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterLogModalComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    timeSpentService = TestBed.inject(TimeSpentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should close the dialog on closeDialog()', () => {
  //   // const closeSpy = spyOn(dialogRef, 'close');
  //   component.closeDialog();
  //   expect(matDialogRef.close).toHaveBeenCalled();
  // });

  it('should set the date on addEvent()', () => {
    const mockDate = new Date('2023-01-01');
    const mockEvent: MatDatepickerInputEvent<Date, unknown> = {
      value: mockDate,
      target: {} as any, // Adicione esta linha para satisfazer o tipo
      targetElement: {} as any, // Adicione esta linha para satisfazer o tipo
    };
    component.addEvent(mockEvent);

    expect(component.date).toEqual(mockDate.toISOString());
  });

  // it('should create log and close dialog on createLogRegister()', fakeAsync(() => {
  //   const createTimeSpent: CreateTimeSpent = {
  //     task: 'your_task_id_here',
  //     timeSpent: 2,
  //     comment: 'Test Comment',
  //     spentAt: new Date().toISOString(),
  //   };

  //   spyOn(timeSpentService, 'createTimeSpent').and.returnValue(
  //     of({ timeSpent: 1, spentAt: '', comment: '' })
  //   );

  //   // const closeSpy = spyOn(dialogRef, 'close');
  //   const snackBarOpenSpy = spyOn(snackBar, 'open');

  //   component.hour = '2';
  //   component.comment = 'Test Comment';
  //   component.createLogRegister();
  //   tick();

  //   expect(timeSpentService.createTimeSpent).toHaveBeenCalledWith(
  //     createTimeSpent
  //   );
  //   expect(matDialogRef.close).toHaveBeenCalled();
  //   expect(snackBarOpenSpy).not.toHaveBeenCalled(); // Assumes that createTimeSpent returns success
  // }));

  // it('should handle error on createLogRegister()', fakeAsync(() => {
  //   spyOn(timeSpentService, 'createTimeSpent').and.returnValue(
  //     // Simulate an error response
  //     new Observable((observer) => {
  //       observer.error({ status: 500 });
  //     })
  //   );

  //   const closeSpy = spyOn(dialogRef, 'close');
  //   const snackBarOpenSpy = spyOn(snackBar, 'open');

  //   component.hour = '2';
  //   component.comment = 'Test Comment';
  //   component.createLogRegister();
  //   tick();

  //   expect(timeSpentService.createTimeSpent).toHaveBeenCalled();
  //   expect(closeSpy).not.toHaveBeenCalled();
  //   expect(snackBarOpenSpy).toHaveBeenCalledWith(
  //     'Ocorreu um erro no servidor!',
  //     'OK',
  //     {
  //       horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       duration: 3000,
  //     }
  //   );
  // }));
});
