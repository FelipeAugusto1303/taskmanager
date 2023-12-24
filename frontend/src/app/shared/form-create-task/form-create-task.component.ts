import { Component, Input, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-create-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss'],
})
export class FormCreateTaskComponent implements OnInit {
  @Input() updateList: Function = () => {};

  task: Task = {
    title: '',
    description: '',
    dueDate: '',
  };

  date: moment.Moment | null = null;

  constructor(private service: TaskService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.task.dueDate = `${moment(event.value).year()}-${
      moment(event.value).month() + 1
    }-${moment(event.value).date()}`;
  }

  createTask() {
    this.service.createTask(this.task).subscribe(
      () => {
        if (this.updateList) {
          this.updateList();
        }
        this.task = {
          title: '',
          description: '',
          dueDate: '',
        };
        this.date = null;
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
}
