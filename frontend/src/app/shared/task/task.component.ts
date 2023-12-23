import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
  };

  @Input() updateList: Function | undefined;
  @Input() updateChart: Function | undefined;

  formatedDueDate: string = '';

  constructor(
    private service: TaskService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.task.dueDate) {
      const month = String(new Date(this.task.dueDate).getMonth() + 1).padStart(
        2,
        '0'
      );
      const day = String(new Date(this.task.dueDate).getDate() + 1).padStart(
        2,
        '0'
      );
      this.formatedDueDate = `${day}/${month}/${new Date(
        this.task.dueDate
      ).getFullYear()}`;
    }
  }

  deleteTask() {
    if (this.task.id) {
      this.service.deleteTask(this.task.id).subscribe(() => {
        if (this.updateList) {
          this.updateList();
        }
        if (this.updateChart) {
          this.updateChart();
        }
      });
    }
  }

  openTask() {
    this.router.navigate([`/details/${this.task.id}`]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '95%',
      data: this.task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.updateList) {
        this.updateList();
      }
    });
  }
}
