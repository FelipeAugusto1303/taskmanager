import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
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

  date: Date | any = null;

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
    const body: CreateTimeSpent = {
      task: this.id,
      timeSpent: parseInt(this.hour),
      comment: this.comment,
      spentAt: this.date,
    };
    this.service.createTimeSpent(body).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        console.log(error.status);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.date = event.value.toISOString();
    }
  }
}
