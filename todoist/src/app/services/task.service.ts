import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadTasks();
  }

  // Charger les tâches depuis le localStorage
  private loadTasks(): void {
    const tasks = localStorage.getItem(this.STORAGE_KEY);
    if (tasks) {
      const parsedTasks = JSON.parse(tasks).map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }));
      this.tasksSubject.next(parsedTasks);
    }
  }

  // Sauvegarder les tâches dans le localStorage
  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  // Récupérer toutes les tâches
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Créer une nouvelle tâche
  async createTask(task: Task): Promise<void> {
    const currentTasks = this.tasksSubject.value;
    const newTask: Task = {
      ...task,
      id: Date.now().toString(), // Génère un ID unique
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.saveTasks([newTask, ...currentTasks]);
  }

  // Mettre à jour une tâche
  async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<void> {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === taskId
        ? { ...task, ...updatedTask, updatedAt: new Date() }
        : task
    );

    this.saveTasks(updatedTasks);
  }

  // Supprimer une tâche
  async deleteTask(taskId: string): Promise<void> {
    const currentTasks = this.tasksSubject.value;
    const filteredTasks = currentTasks.filter(task => task.id !== taskId);

    this.saveTasks(filteredTasks);
  }

  // Récupérer une tâche par son ID
  getTaskById(taskId: string): Task | undefined {
    return this.tasksSubject.value.find(task => task.id === taskId);
  }

  // Trier les tâches par date d'échéance
  sortTasksByDueDate(ascending: boolean = true): void {
    const currentTasks = this.tasksSubject.value;
    const sortedTasks = [...currentTasks].sort((a, b) => {
      const comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return ascending ? comparison : -comparison;
    });

    this.saveTasks(sortedTasks);
  }

  // Filtrer les tâches par statut
  filterTasksByStatus(status: 'completed' | 'in_progress' | 'not_started'): Task[] {
    return this.tasksSubject.value.filter(task => task.status === status);
  }

  // Filtrer les tâches par priorité
  filterTasksByPriority(priority: 'high' | 'medium' | 'low'): Task[] {
    return this.tasksSubject.value.filter(task => task.priority === priority);
  }
}
