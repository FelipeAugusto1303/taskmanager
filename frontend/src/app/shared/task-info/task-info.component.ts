import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss'],
})
export class TaskInfoComponent implements OnInit, OnChanges {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    concluded: false,
    concludedAt: '',
  };

  @Input() updateTask: Function | undefined;

  tempDate: Date | null = null;
  tempDateConcluded: Date | null = null;
  date: string = '';
  concludedDate: string = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      this.updateDate();
      this.updateConcludedDate();
    }
  }

  private updateDate(): void {
    if (this.task.dueDate) {
      this.tempDate = new Date(this.task.dueDate);
      this.formatDate();
    }
  }

  private formatDate(): void {
    if (this.tempDate) {
      const month = String(this.tempDate.getMonth() + 1).padStart(2, '0');
      const day = String(this.tempDate.getDate() + 1).padStart(2, '0');
      this.date = `${day}/${month}/${this.tempDate.getFullYear()}`;
    }
  }

  private updateConcludedDate(): void {
    if (this.task.concludedAt) {
      this.tempDateConcluded = new Date(this.task.concludedAt);
      this.formatConcludedDate();
    }
  }

  private formatConcludedDate(): void {
    if (this.tempDateConcluded) {
      const month = String(this.tempDateConcluded.getMonth() + 1).padStart(
        2,
        '0'
      );
      const day = String(this.tempDateConcluded.getDate()).padStart(2, '0');
      this.concludedDate = `${day}/${month}/${this.tempDateConcluded.getFullYear()}`;
    }
  }

  deleteTask() {
    if (this.task.id) {
      this.taskService.deleteTask(this.task.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  concludeTask() {
    if (this.task.id) {
      this.taskService.concludeTask(this.task.id).subscribe(() => {
        if (this.updateTask) {
          this.updateTask();
        }
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '95%',
      data: this.task,
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.updateTask) {
        this.updateTask();
      }
    });
  }
}
