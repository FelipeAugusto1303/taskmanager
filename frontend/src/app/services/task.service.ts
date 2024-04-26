import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConcludedTask, Task } from '../interfaces/task';
import { Observable } from 'rxjs';

const API: string = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  listTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${API}/tasks/`);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${API}/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authorization'), // Substitua 'token' pelo seu token de autenticação
    });
    return this.http.post<Task>(`${API}/tasks/`, task, { headers });
  }

  updateTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authorization'), // Substitua 'token' pelo seu token de autenticação
    });
    return this.http.patch<Task>(`${API}/tasks/${task.id}`, task, { headers });
  }

  concludeTask(id: string): Observable<Task> {
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const date = `${new Date().getFullYear()}-${month}-${day}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authorization'), // Substitua 'token' pelo seu token de autenticação
    });

    return this.http.patch<Task>(
      `${API}/tasks/${id}`,
      {
        concluded: true,
        concludedAt: date,
      },
      { headers }
    );
  }

  deleteTask(id: string): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authorization'),
    });
    return this.http.delete<Task>(`${API}/tasks/${id}`, { headers });
  }

  getTotalConcludedByDay(): Observable<ConcludedTask[]> {
    return this.http.get<ConcludedTask[]>(`${API}/tasks/log`);
  }
}
