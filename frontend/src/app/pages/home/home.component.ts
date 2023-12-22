import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/shared/task/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  taskList: Task[] = [];
  constructor(private service: TaskService) {}

  ngOnInit(): void {
    this.service.listTasks().subscribe((list) => {
      this.taskList = list;
    });
  }

  updateTaskList() {
    this.service.listTasks().subscribe((list) => {
      this.taskList = list;
    });
  }
}
