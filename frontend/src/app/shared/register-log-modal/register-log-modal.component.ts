import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateTimeSpent } from 'src/app/interfaces/timeSpent';
import { TimeSpentService } from 'src/app/services/time-spent.service';

@Component({
  selector: 'app-register-log-modal',
  templateUrl: './register-log-modal.component.html',
  styleUrls: ['./register-log-modal.component.scss'],
})
export class RegisterLogModalComponent implements OnInit {
  hour: string = '';
  comment: string = '';
  id: string;

  constructor(
    public dialogRef: MatDialogRef<RegisterLogModalComponent>,
    private service: TimeSpentService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.id = data;
  }

  ngOnInit(): void {}

  createLogRegister() {
    console.log(this.id);
    if (this.id) {
      console.log('entrei', this.id);
    }
    const stringData = new Date().toISOString();

    const body: CreateTimeSpent = {
      task: this.id,
      timeSpent: parseInt(this.hour),
      comment: this.comment,
      spentAt: stringData,
    };
    this.service.createTimeSpent(body).subscribe(() => {
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
