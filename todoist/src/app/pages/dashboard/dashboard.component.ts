import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  completedTasksPercentage: number = 0;
  pendingTasksPercentage: number = 0;
  overdueTasks: number = 0;
  completedTasksCount: number = 0;
  pendingTasksCount: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.calculateStatistics();
  }

  private calculateStatistics() {
    this.taskService.getTasks().subscribe(tasks => {
      const totalTasks = tasks.length;
      if (totalTasks === 0) return;

      this.completedTasksCount = tasks.filter(task => task.status === 'completed').length;
      this.completedTasksPercentage = Math.round((this.completedTasksCount / totalTasks) * 100);

      this.pendingTasksCount = totalTasks - this.completedTasksCount;
      this.pendingTasksPercentage = 100 - this.completedTasksPercentage;

      const today = new Date();
      this.overdueTasks = tasks.filter(task =>
        task.status !== 'completed' &&
        new Date(task.dueDate) < today
      ).length;

      // Initialize charts after data is loaded
      this.initializeTasksChart();
      this.initializeStatsChart();
    });
  }

  private initializeTasksChart() {
    const ctx = document.getElementById('tasksChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Tâches accomplies', 'Tâches en cours', 'Tâches en retard'],
        datasets: [{
          data: [this.completedTasksCount, this.pendingTasksCount, this.overdueTasks],
          backgroundColor: [
            'rgba(34, 197, 94, 0.6)',  // green
            'rgba(59, 130, 246, 0.6)',  // blue
            'rgba(239, 68, 68, 0.6)',   // red
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Répartition des tâches'
          }
        }
      }
    });
  }

  private initializeStatsChart() {
    const ctx = document.getElementById('statsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tâches accomplies', 'Tâches en cours', 'Tâches en retard'],
        datasets: [{
          label: 'Nombre de tâches',
          data: [this.completedTasksCount, this.pendingTasksCount, this.overdueTasks],
          backgroundColor: [
            'rgba(34, 197, 94, 0.6)',
            'rgba(59, 130, 246, 0.6)',
            'rgba(239, 68, 68, 0.6)',
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Statistiques des tâches'
          }
        }
      }
    });
  }
}
