import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CreateTimeSpent, TimeSpent } from 'src/app/interfaces/timeSpent';
import { TimeSpentService } from 'src/app/services/time-spent.service';

@Component({
  selector: 'app-edit-log-modal',
  templateUrl: './edit-log-modal.component.html',
  styleUrls: ['./edit-log-modal.component.scss'],
})
export class EditLogModalComponent implements OnInit {
  hour: string = '';
  comment: string = '';
  id: string;

  date: Date | any = new Date();

  constructor(
    public dialogRef: MatDialogRef<EditLogModalComponent>,
    private snackBar: MatSnackBar,
    private service: TimeSpentService,
    @Inject(MAT_DIALOG_DATA) public data: TimeSpent
  ) {
    this.id = data.timeSpent_id;
    this.hour = String(data.timeSpent_timeSpent);
    this.comment = data.timeSpent_comment;
    this.date = new Date(data.timeSpent_spentAt);
    this.date.setDate(this.date.getDate() + 1);
  }

  ngOnInit(): void {}

  editLogRegister() {
    const body: CreateTimeSpent = {
      timeSpent: parseInt(this.hour),
      comment: this.comment,
      spentAt: this.date,
    };
    this.service.updateComment(this.id, body).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        let message = '';
        if (error.status === 400) {
          message =
            'Informações incorretas! Ajuste os dados ou entre com outras informações.';
        }
        if (error.status === 500) {
          message = 'Ocorreu um erro no servidor!';
        }

        this.snackBar.open(message, 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
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
