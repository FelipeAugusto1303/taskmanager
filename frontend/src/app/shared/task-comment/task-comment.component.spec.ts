import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { TaskCommentComponent } from './task-comment.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TimeSpentService } from 'src/app/services/time-spent.service';
import { of, throwError } from 'rxjs';

describe('TaskCommentComponent', () => {
  let component: TaskCommentComponent;
  let fixture: ComponentFixture<TaskCommentComponent>;
  let timeSpentService: TimeSpentService;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCommentComponent],
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule],
      providers: [TimeSpentService, MatSnackBar, MatDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCommentComponent);
    component = fixture.componentInstance;
    timeSpentService = TestBed.inject(TimeSpentService);
    snackBar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should hour comment correct format with 1 hour', () => {
    component.log.timeSpent_timeSpent = 1;

    component.ngOnInit();

    expect(component.hourComment).toBe('1 hora trabalhada');
  });

  it('Should hour comment correct format with 2 hours', () => {
    component.log.timeSpent_timeSpent = 2;

    component.ngOnInit();

    expect(component.hourComment).toBe('2 horas trabalhadas');
  });

  it('Should date comment correct format', () => {
    component.log.timeSpent_spentAt = '2023-12-31';

    component.ngOnInit();

    expect(component.dateComment).toBe('31/12/2023');
  });

  it('should call deleteComment and updateLog on success', fakeAsync(() => {
    spyOn(timeSpentService, 'deleteComment').and.returnValue(
      of({
        timeSpent_id: '',
        timeSpent_comment: '',
        timeSpent_timeSpent: 1,
        timeSpent_spentAt: '',
      })
    );
    const updateLogSpy = spyOn(component, 'updateLog');

    component.deleteComment();

    tick();
    fixture.detectChanges();

    expect(updateLogSpy).toHaveBeenCalled();
  }));

  it('should show snackbar on 404 error', fakeAsync(() => {
    const errorMessage = 'Registro não encontrado! Verifique as informações';
    spyOn(timeSpentService, 'deleteComment').and.returnValue(
      throwError({ status: 404 })
    );
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.deleteComment();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).toHaveBeenCalledWith(errorMessage, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }));

  it('should show snackbar on 500 error', fakeAsync(() => {
    const errorMessage = 'Ocorreu um erro no servidor!';
    spyOn(timeSpentService, 'deleteComment').and.returnValue(
      throwError({ status: 500 })
    );
    const snackBarOpenSpy = spyOn(snackBar, 'open');

    component.deleteComment();

    tick();
    fixture.detectChanges();

    expect(snackBarOpenSpy).toHaveBeenCalledWith(errorMessage, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }));
});
