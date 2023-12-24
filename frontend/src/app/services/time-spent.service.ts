import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoursTask } from '../interfaces/task';
import { CreateTimeSpent, TimeSpent } from '../interfaces/timeSpent';

const API: string = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class TimeSpentService {
  constructor(private http: HttpClient) {}

  getSpentHours(id: string): Observable<HoursTask[]> {
    return this.http.get<HoursTask[]>(`${API}/time-spent/hours/${id}`);
  }

  getAllLogsById(id: string): Observable<TimeSpent[]> {
    return this.http.get<TimeSpent[]>(`${API}/time-spent/logs/${id}`);
  }

  createTimeSpent(body: CreateTimeSpent): Observable<CreateTimeSpent> {
    return this.http.post<CreateTimeSpent>(`${API}/time-spent`, body);
  }

  deleteComment(id: string): Observable<TimeSpent> {
    return this.http.delete<TimeSpent>(`${API}/time-spent/${id}`);
  }

  updateComment(
    id: string,
    body: CreateTimeSpent
  ): Observable<CreateTimeSpent> {
    return this.http.patch<CreateTimeSpent>(`${API}/time-spent/${id}`, body);
  }
}
