import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TimeSpentService } from 'src/app/services/time-spent.service';
import { HoursTask, Task } from 'src/app/shared/task/task';
import {
  Chart,
  LineController,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  registerables,
} from 'chart.js';

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

  hoursTask: HoursTask[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: TaskService,
    private spentService: TimeSpentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getTask(id).subscribe((task) => {
        this.task = task;
      });
      this.spentService.getSpentHours(id).subscribe((hours) => {
        this.hoursTask = hours;
        this.createLineChart();
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

  private createLineChart(): void {
    const days = this.hoursTask.map(
      (entry) =>
        `${new Date(entry.timeSpent_spentAt).getFullYear()}-${
          new Date(entry.timeSpent_spentAt).getMonth() + 1
        }-${new Date(entry.timeSpent_spentAt).getDate() + 1}`
    );
    const totals = this.hoursTask.map((entry) => entry.hours);

    const ctx = document.getElementById('task-barChart') as HTMLCanvasElement;

    Chart.register(...registerables);

    const lineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Total Concluded',
            data: totals,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    });
  }
}
