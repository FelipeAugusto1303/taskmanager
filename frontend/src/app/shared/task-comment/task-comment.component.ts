import { Component, Input, OnInit } from '@angular/core';
import { TimeSpent } from 'src/app/interfaces/timeSpent';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss'],
})
export class TaskCommentComponent implements OnInit {
  @Input() log: TimeSpent = {
    timeSpent_comment: '',
    timeSpent_spentAt: '',
    timeSpent_timeSpent: 0,
  };

  hourComment: string = '';
  dateComment: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.log && this.log.timeSpent_timeSpent <= 1) {
      this.hourComment = `${this.log.timeSpent_timeSpent} hora trabalhada`;
    } else {
      this.hourComment = `${this.log.timeSpent_timeSpent} horas trabalhadas`;
    }

    if (this.log.timeSpent_spentAt) {
      const month = String(
        new Date(this.log.timeSpent_spentAt).getMonth() + 1
      ).padStart(2, '0');
      const day = String(
        new Date(this.log.timeSpent_spentAt).getDate() + 2
      ).padStart(2, '0');
      this.dateComment = `${day}/${month}/${new Date(
        this.log.timeSpent_spentAt
      ).getFullYear()}`;
    }
  }
}
