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

  concludeTask(id: string): Observable<Task> {
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate() + 1).padStart(2, '0');
    const date = `${new Date().getFullYear()}-${month}-${day}`;

    return this.http.patch<Task>(`http://localhost:3000/tasks/${id}`, {
      concluded: true,
      concludedAt: date,
    });
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`http://localhost:3000/tasks/${id}`);
  }

  getTotalConcludedByDay(): Observable<ConcludedTask[]> {
    return this.http.get<ConcludedTask[]>('http://localhost:3000/tasks/log');
  }
}
