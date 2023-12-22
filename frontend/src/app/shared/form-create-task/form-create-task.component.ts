import { Component, Input, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Task } from '../task/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-form-create-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss'],
})
export class FormCreateTaskComponent implements OnInit {
  @Input() updateList: Function | undefined;

  task: Task = {
    title: '',
    description: '',
    dueDate: '',
  };

  date: moment.Moment | null = null;

  constructor(private service: TaskService) {}

  ngOnInit(): void {}

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.task.dueDate = `${moment(event.value).year()}-${
      moment(event.value).month() + 1
    }-${moment(event.value).date()}`;
  }

  createTask() {
    this.service.createTask(this.task).subscribe(() => {
      alert('Tarefa criada');
      if (this.updateList) {
        this.updateList();
      }
      this.task = {
        title: '',
        description: '',
        dueDate: '',
      };
      this.date = null;
    });
  }
}
