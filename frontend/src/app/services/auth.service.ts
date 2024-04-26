import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const API: string = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${API}/user/login`, credentials).pipe(
      tap(() => {
        this.loggedIn = true;
        localStorage.setItem('loggedIn', 'true');
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('authorization');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
  }

  registerUser(userInfo: any): Observable<any> {
    return this.http.post(`${API}/user/create`, userInfo);
  }

  sendEmail(body: { email: string }): Observable<any> {
    return this.http.post(`${API}/user/email`, body);
  }

  resetPassword(body: {
    code: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.patch(`${API}/user/confirm-code`, body);
  }
}
