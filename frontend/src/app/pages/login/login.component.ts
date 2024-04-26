import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.authService.login(this.loginForm.value).subscribe((value) => {
      console.log(this.authService.isLoggedIn());
      localStorage.setItem('authorization', value.access_token);
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['']);
      }
    });
  }

  registerUser() {
    this.router.navigate(['/register']);
  }
}
