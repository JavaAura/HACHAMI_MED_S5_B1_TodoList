import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.scss'
})
export class RightSidebarComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchQuery: string = '';
  showAll: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => ({
        ...category,
        color: this.getRandomColor()
      }));
      this.filterCategories();
    });
  }

  private getRandomColor(): string {
    const colors = [
      '#FF6B6B', // red
      '#4ECDC4', // teal
      '#45B7D1', // blue
      '#96CEB4', // green
      '#FFEEAD', // yellow
      '#D4A5A5', // pink
      '#9B59B6', // purple
      '#3498DB'  // bright blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  searchCategories() {
    this.filterCategories();
  }

  filterCategories() {
    let filtered = this.categories;
    if (this.searchQuery) {
      filtered = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.filteredCategories = this.showAll ? filtered : filtered.slice(0, 5);
  }

  showAllCategories() {
    this.showAll = !this.showAll;
    this.filterCategories();
  }

  onCategorySelect(category: Category) {
    // Implement your category selection logic here
  }
}


