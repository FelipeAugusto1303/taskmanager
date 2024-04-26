import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
  requestForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  submit() {
    this.authService.sendEmail(this.requestForm.value).subscribe(
      () => {
        localStorage.setItem('resetEmail', this.requestForm.value.email);
        this.router.navigate(['/reset-account']);
        this.snackBar.open('Código de confirmação enviado ao email', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Falha no servidor', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    );
  }
}
