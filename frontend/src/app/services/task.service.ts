import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConcludedTask, Task } from '../shared/task/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  listTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasks/');
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3000/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3000/tasks/', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(
      `http://localhost:3000/tasks/${task.id}`,
      task
    );
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`http://localhost:3000/tasks/${id}`);
  }

  getTotalConcludedByDay(): Observable<ConcludedTask[]> {
    return this.http.get<ConcludedTask[]>('http://localhost:3000/tasks/log');
  }
}
