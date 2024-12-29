import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.interface';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  isModalOpen = false;
  categoryForm!: FormGroup;
  categories$ = this.categoryService.getCategories();
  editingCategoryId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  private initForm(category?: Category): void {
    this.categoryForm = this.fb.group({
      name: [
        category?.name || '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
          ],
          asyncValidators: [this.duplicateCategoryValidator()],
          updateOn: 'blur'
        }
      ]
    });
  }

  private duplicateCategoryValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value?.trim().toLowerCase();
      if (!value) {
        return Promise.resolve(null);
      }

      return this.categories$.pipe(
        take(1),
        map(categories => {
          const isDuplicate = categories.some(cat =>
            cat.name.trim().toLowerCase() === value &&
            cat.id !== this.editingCategoryId
          );
          return isDuplicate ? { duplicate: true } : null;
        })
      );
    };
  }

  openCategoryModal(category?: Category): void {
    this.editingCategoryId = category?.id || null;
    this.initForm(category);
    this.isModalOpen = true;
  }

  closeCategoryModal(): void {
    this.isModalOpen = false;
    this.categoryForm.reset();
    this.editingCategoryId = null;
  }

  saveCategory(): void {
    if (this.categoryForm.valid && !this.categoryForm.pending) {
      const name = this.categoryForm.get('name')?.value.trim();

      // Double vérification des doublons avant la sauvegarde
      this.categories$.pipe(take(1)).subscribe(categories => {
        const isDuplicate = categories.some(cat =>
          cat.name.trim().toLowerCase() === name.toLowerCase() &&
          cat.id !== this.editingCategoryId
        );

        if (!isDuplicate) {
          this.saveCategoryData(name);
        } else {
          this.categoryForm.get('name')?.setErrors({ duplicate: true });
        }
      });
    }
  }

  private saveCategoryData(name: string): void {
    if (this.editingCategoryId) {
      this.categoryService.updateCategory(this.editingCategoryId, name);
    } else {
      this.categoryService.addCategory(name);
    }
    this.closeCategoryModal();
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id);
  }

}
