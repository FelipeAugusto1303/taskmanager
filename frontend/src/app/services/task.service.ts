import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../shared/task/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  listTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasks/');
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3000/tasks/', task);
  }
}
