import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TimeSpentService } from './time-spent.service';
import { CreateTimeSpent, TimeSpent } from '../interfaces/timeSpent';
import { HoursTask } from '../interfaces/task';

describe('TimeSpentService', () => {
  let service: TimeSpentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimeSpentService],
    });

    service = TestBed.inject(TimeSpentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get spent hours for a task', () => {
    const taskId = '1';
    const mockHours: HoursTask[] = [
      { timeSpent_spentAt: '2023-01-01', hours: 5 },
      { timeSpent_spentAt: '2023-01-02', hours: 8 },
    ];

    service.getSpentHours(taskId).subscribe((hours) => {
      expect(hours).toEqual(mockHours);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/time-spent/hours/${taskId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHours);
  });

  it('should get all logs for a task', () => {
    const taskId = '1';
    const mockLogs: TimeSpent[] = [
      {
        timeSpent_id: '1',
        timeSpent_comment: 'Log 1',
        timeSpent_spentAt: '2023-01-01',
        timeSpent_timeSpent: 2,
      },
      {
        timeSpent_id: '2',
        timeSpent_comment: 'Log 2',
        timeSpent_spentAt: '2023-01-02',
        timeSpent_timeSpent: 3,
      },
    ];

    service.getAllLogsById(taskId).subscribe((logs) => {
      expect(logs).toEqual(mockLogs);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/time-spent/logs/${taskId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockLogs);
  });

  it('should create a new time spent entry', () => {
    const mockBody: CreateTimeSpent = {
      timeSpent: 3,
      comment: 'New log',
      spentAt: '2023-01-03',
    };

    service.createTimeSpent(mockBody).subscribe((result) => {
      expect(result).toEqual(mockBody);
    });

    const req = httpMock.expectOne('http://localhost:3000/time-spent');
    expect(req.request.method).toBe('POST');
    req.flush(mockBody);
  });

  it('should delete a time spent entry', () => {
    const entryId = '1';

    service.deleteComment(entryId).subscribe();

    const req = httpMock.expectOne(
      `http://localhost:3000/time-spent/${entryId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a time spent entry', () => {
    const entryId = '1';
    const mockBody: CreateTimeSpent = {
      timeSpent: 4,
      comment: 'Updated log',
      spentAt: '2023-01-04',
    };

    service.updateComment(entryId, mockBody).subscribe((result) => {
      expect(result).toEqual(mockBody);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/time-spent/${entryId}`
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(mockBody);
  });
});
