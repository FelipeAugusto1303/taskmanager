import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  selectedDate: Date;

  tempTask: Task;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private service: TaskService
  ) {
    this.selectedDate = new Date(data.dueDate);
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);

    this.tempTask = JSON.parse(JSON.stringify(data));
  }

  ngOnInit(): void {}

  updateTask() {
    const year = this.selectedDate.getFullYear();
    const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0'); // Mês é base 0, então adicionamos 1
    const day = String(this.selectedDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    this.tempTask.dueDate = formattedDate;

    this.service.updateTask(this.tempTask).subscribe(() => {
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
