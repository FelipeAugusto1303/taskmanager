import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ConcludedTask, Task } from 'src/app/shared/task/task';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  taskList: Task[] = [];

  chartData: ConcludedTask[] = [
    {
      day: '2023-12-20',
      total_concluded: 10,
    },
    {
      day: '2023-12-21',
      total_concluded: 15,
    },
    {
      day: '2023-12-22',
      total_concluded: 20,
    },
    {
      day: '2023-12-23',
      total_concluded: 10,
    },
  ];
  constructor(private service: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.service.listTasks().subscribe((list) => {
      this.taskList = list;
    });
  }

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  updateTaskList = () => {
    this.loadTaskList();
  };

  private loadTaskList() {
    this.service.listTasks().subscribe((list) => {
      this.taskList = list;
    });
  }

  private createLineChart(): void {
    const days = this.chartData.map((entry) => entry.day);
    const totals = this.chartData.map((entry) => entry.total_concluded);

    const ctx = document.getElementById('home-barChart') as HTMLCanvasElement;

    Chart.register(...registerables);

    const lineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Total Concluded',
            data: totals,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
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
