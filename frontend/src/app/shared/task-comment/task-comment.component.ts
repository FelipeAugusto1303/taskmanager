import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeSpent } from 'src/app/interfaces/timeSpent';
import { TimeSpentService } from 'src/app/services/time-spent.service';
import { EditLogModalComponent } from '../edit-log-modal/edit-log-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss'],
})
export class TaskCommentComponent implements OnInit {
  @Input() log: TimeSpent = {
    timeSpent_id: '',
    timeSpent_comment: '',
    timeSpent_spentAt: '',
    timeSpent_timeSpent: 0,
  };

  hourComment: string = '';
  dateComment: string = '';

  @Input() updateLog: Function = () => {};

  constructor(
    private service: TimeSpentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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
        new Date(this.log.timeSpent_spentAt).getDate() + 1
      ).padStart(2, '0');
      this.dateComment = `${day}/${month}/${new Date(
        this.log.timeSpent_spentAt
      ).getFullYear()}`;
    }
  }

  deleteComment() {
    this.service.deleteComment(this.log.timeSpent_id).subscribe(
      () => {
        if (this.updateLog) {
          this.updateLog();
        }
      },
      (error) => {
        let message = '';
        if (error.status === 404) {
          message = 'Registro não encontrado! Verifique as informações';
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

  openDialog() {
    const dialogRef = this.dialog.open(EditLogModalComponent, {
      width: '100%',
      data: this.log,
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.updateLog) {
        this.updateLog();
      }
    });
  }
}
