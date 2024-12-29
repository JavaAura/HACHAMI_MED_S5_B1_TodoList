import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly STORAGE_KEY = 'categories';
  private categoriesSubject = new BehaviorSubject<Category[]>(this.loadCategories());

  constructor() {}

  private loadCategories(): Category[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading categories:', error);
      return [];
    }
  }

  private saveCategories(categories: Category[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
      this.categoriesSubject.next(categories);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  addCategory(name: string): void {
    if (!name?.trim()) return;

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date()
    };

    const currentCategories = this.loadCategories();
    this.saveCategories([...currentCategories, newCategory]);
  }

  deleteCategory(id: string): void {
    const currentCategories = this.loadCategories();
    const updatedCategories = currentCategories.filter(category => category.id !== id);
    this.saveCategories(updatedCategories);
  }

  updateCategory(id: string, name: string): void {
    if (!name?.trim()) return;

    const currentCategories = this.loadCategories();
    const updatedCategories = currentCategories.map(category =>
      category.id === id ? { ...category, name: name.trim() } : category
    );

    this.saveCategories(updatedCategories);
  }
}
