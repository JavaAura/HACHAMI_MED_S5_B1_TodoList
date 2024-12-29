import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { CategoryService } from '../../../services/category.service';
import { Task } from '../../../models/task.interface';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tasks$: Observable<Task[]>;
  taskForm!: FormGroup;
  isModalOpen = false;
  editingTaskId: string | null = null;
  categories$: Observable<Category[]>;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.tasks$ = this.taskService.getTasks();
    this.categories$ = this.categoryService.getCategories();
    console.log(this.tasks$);

    this.initForm();
  }

  ngOnInit(): void {}

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['not_started', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  openTaskModal(task?: Task): void {
    this.isModalOpen = true;
    this.categories$ = this.categoryService.getCategories();
    if (task?.id) {
      this.editingTaskId = task.id;
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        dueDate: this.formatDateForInput(task.dueDate),
        priority: task.priority,
        status: task.status,
        categoryId: task.categoryId
      });
    } else {
      this.editingTaskId = null;
      this.taskForm.reset({
        priority: 'medium',
        status: 'not_started'
      });
    }
  }

  closeTaskModal(): void {
    this.isModalOpen = false;
    this.editingTaskId = null;
    this.taskForm.reset();
  }

  async saveTask(): Promise<void> {
    if (this.taskForm.valid) {
      const taskData: Task = {
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate)
      };

      try {
        if (this.editingTaskId) {
          await this.taskService.updateTask(this.editingTaskId, taskData);
        } else {
          await this.taskService.createTask(taskData);
        }
        this.closeTaskModal();
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await this.taskService.deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }

  private formatDateForInput(date: Date): string {
    return new Date(date).toISOString().slice(0, 16);
  }

  getPriorityColor(priority: string): string {
    const colors = {
      high: 'border-l-8 border-l-red-600',
      medium: 'border-l-8 border-l-yellow-600',
      low: 'border-l-8 border-l-green-600'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  }

  getStatusBadgeClass(status: string): string {
    const classes = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      not_started: 'bg-gray-100 text-gray-800'
    };
    return `${classes[status as keyof typeof classes] || classes.not_started}`;
  }

  getStatusBorderClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'not_started':
      default:
        return 'bg-gray-500';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return '#22c55e'; // green-500
      case 'in_progress':
        return '#3b82f6'; // blue-500
      default:
        return '#ef4444'; // red-500
    }
  }
}
