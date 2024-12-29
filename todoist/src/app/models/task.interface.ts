export interface Task {
  id?: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'not_started';
  categoryId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
