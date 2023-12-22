import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/shared/task/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    concluded: false,
    concludedAt: '',
  };
  constructor(private route: ActivatedRoute, private service: TaskService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getTask(id).subscribe((task) => {
        this.task = task;
      });
    }
  }

  updateTask = () => {
    this.loadTask();
  };

  private loadTask() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getTask(id).subscribe((task) => {
        this.task = task;
      });
    }
  }
}
