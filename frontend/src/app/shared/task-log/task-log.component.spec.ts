import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskLogComponent } from './task-log.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TimeSpentService } from 'src/app/services/time-spent.service';
import { of } from 'rxjs';
import { RegisterLogModalComponent } from '../register-log-modal/register-log-modal.component';

describe('TaskLogComponent', () => {
  let component: TaskLogComponent;
  let fixture: ComponentFixture<TaskLogComponent>;
  let mockActivatedRoute: any;
  let mockDialog: any;
  let mockTimeSpentService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(),
      }),
    };

    mockTimeSpentService = {
      getAllLogsById: jasmine
        .createSpy('getAllLogsById')
        .and.returnValue(of([])),
    };

    TestBed.configureTestingModule({
      declarations: [TaskLogComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MatDialog, useValue: mockDialog },
        { provide: TimeSpentService, useValue: mockTimeSpentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize logs on ngOnInit', () => {
    expect(component.logs.length).toBe(0);
    expect(mockTimeSpentService.getAllLogsById).toHaveBeenCalledWith('1');
  });

  it('should call updateChart on updateLog', () => {
    spyOn(component, 'updateChart');
    component.updateLog();
    expect(component.updateChart).toHaveBeenCalled();
  });

  // it('should open dialog and update logs on openDialog', () => {
  //   spyOn(component, 'updateLog');
  //   component.openDialog();
  //   expect(mockDialog.open).toHaveBeenCalledWith(RegisterLogModalComponent, {
  //     width: '100%',
  //     data: '1',
  //   });

  //   // Simulate dialog closed
  //   fixture.detectChanges();
  //   expect(component.updateLog).toHaveBeenCalled();
  //   expect(mockTimeSpentService.getAllLogsById).toHaveBeenCalledWith('1');
  // });

  it('should update logs on updateLog', () => {
    component.updateLog();
    expect(mockTimeSpentService.getAllLogsById).toHaveBeenCalledWith('1');
  });
});
