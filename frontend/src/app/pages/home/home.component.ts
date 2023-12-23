import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ConcludedTask, Task } from 'src/app/interfaces/task';
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
  concludedList: Task[] = [];

  chartData: ConcludedTask[] = [];
  constructor(private service: TaskService) {}

  ngOnInit(): void {
    this.service.listTasks().subscribe((list) => {
      this.taskList = list.filter((item) => item.concluded === false);
      this.concludedList = list.filter((item) => item.concluded === true);
    });

    this.service.getTotalConcludedByDay().subscribe((list) => {
      this.chartData = list;
      this.createLineChart();
    });
  }

  ngAfterViewInit(): void {}

  updateTaskList = () => {
    this.loadTaskList();
  };

  updateChart = () => {
    this.loadChart();
  };

  private loadTaskList() {
    this.service.listTasks().subscribe((list) => {
      this.taskList = list.filter((item) => item.concluded === false);
      this.concludedList = list.filter((item) => item.concluded === true);
    });
  }

  private loadChart() {
    this.service.getTotalConcludedByDay().subscribe((list) => {
      this.chartData = list;
      this.createLineChart();
    });
  }

  private createLineChart(): void {
    const days = this.chartData.map(
      (entry) =>
        `${new Date(entry.day).getDate() + 1}/${
          new Date(entry.day).getMonth() + 1
        }/${new Date(entry.day).getFullYear()}`
    );
    const totals = this.chartData.map((entry) => entry.total_hours);

    const ctx = document.getElementById('home-barChart') as HTMLCanvasElement;

    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    Chart.register(...registerables);

    const lineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Total de tarefas concluídas',
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
