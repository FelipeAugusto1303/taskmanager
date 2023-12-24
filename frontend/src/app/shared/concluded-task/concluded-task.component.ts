import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-concluded-task',
  templateUrl: './concluded-task.component.html',
  styleUrls: ['./concluded-task.component.scss'],
})
export class ConcludedTaskComponent implements OnInit {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    concludedAt: '',
  };

  @Input() updateList: Function = () => {};
  @Input() updateChart: Function = () => {};

  formatedDueDate: string = '';
  formatedConcludedDate: string = '';

  constructor(private service: TaskService, private router: Router) {}

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
    if (this.task.concludedAt) {
      const month = String(
        new Date(this.task.concludedAt).getMonth() + 1
      ).padStart(2, '0');
      const day = String(
        new Date(this.task.concludedAt).getDate() + 1
      ).padStart(2, '0');
      this.formatedConcludedDate = `${day}/${month}/${new Date(
        this.task.concludedAt
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
}
