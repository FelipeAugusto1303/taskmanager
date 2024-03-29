import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  selectedDate: Date | any;

  tempTask: Task;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private service: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.selectedDate = new Date(data.dueDate);
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);

    this.tempTask = JSON.parse(JSON.stringify(data));
  }

  ngOnInit(): void {}

  updateTask() {
    const date = new Date(this.selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    this.tempTask.dueDate = formattedDate;

    this.service.updateTask(this.tempTask).subscribe(
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
      this.selectedDate = event.value.toISOString();
    }
  }
}
