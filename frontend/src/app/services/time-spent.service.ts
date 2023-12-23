import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoursTask } from '../interfaces/task';
import { CreateTimeSpent, TimeSpent } from '../interfaces/timeSpent';

@Injectable({
  providedIn: 'root',
})
export class TimeSpentService {
  constructor(private http: HttpClient) {}

  getSpentHours(id: string): Observable<HoursTask[]> {
    return this.http.get<HoursTask[]>(
      `http://localhost:3000/time-spent/hours/${id}`
    );
  }

  getAllLogsById(id: string): Observable<TimeSpent[]> {
    return this.http.get<TimeSpent[]>(
      `http://localhost:3000/time-spent/logs/${id}`
    );
  }

  createTimeSpent(body: CreateTimeSpent): Observable<CreateTimeSpent> {
    return this.http.post<CreateTimeSpent>(
      'http://localhost:3000/time-spent',
      body
    );
  }
}
