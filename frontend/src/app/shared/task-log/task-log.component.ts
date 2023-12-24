import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TimeSpent } from 'src/app/interfaces/timeSpent';
import { TimeSpentService } from 'src/app/services/time-spent.service';
import { RegisterLogModalComponent } from '../register-log-modal/register-log-modal.component';

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.scss'],
})
export class TaskLogComponent implements OnInit {
  logs: TimeSpent[] = [];

  @Input() updateChart: Function = () => {};

  constructor(
    private service: TimeSpentService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getAllLogsById(id).subscribe((logs) => {
        this.logs = logs;
      });
    }
  }

  updateLog = () => {
    this.getLog();
  };

  private getLog() {
    this.updateChart();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getAllLogsById(id).subscribe((logs) => {
        this.logs = logs;
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterLogModalComponent, {
      width: '100%',
      data: this.route.snapshot.paramMap.get('id'),
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.updateChart) {
        this.updateChart();
      }
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.service.getAllLogsById(id).subscribe((logs) => {
          this.logs = logs;
        });
      }
    });
  }
}
