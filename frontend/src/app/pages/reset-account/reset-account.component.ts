import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.scss'],
})
export class ResetAccountComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const body = {
      email: localStorage.getItem('resetEmail'),
      ...this.accountForm.value,
    };

    this.authService.resetPassword(body).subscribe(() => {
      this.router.navigate(['/login']);
      this.snackBar.open('Senha atualizada', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      });
    });
  }
}
