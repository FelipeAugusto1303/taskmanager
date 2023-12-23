import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoursTask } from '../shared/task/task';

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
}
