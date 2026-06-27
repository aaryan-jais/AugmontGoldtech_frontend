import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  totalProducts = 0;
  totalCategories = 0;

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {

    // PRODUCTS COUNT
    this.productService.getAll(1, 1, '')
      .subscribe({
        next: (res: any) => {
          this.totalProducts = res?.count || 0;
        },
        error: (err) => {
          console.log("PRODUCT STATS ERROR:", err);
          this.totalProducts = 0;
        }
      });

    // CATEGORIES COUNT
    this.categoryService.getAll()
      .subscribe({
        next: (res: any) => {
          this.totalCategories = res?.length || 0;
        },
        error: (err) => {
          console.log("CATEGORY STATS ERROR:", err);
          this.totalCategories = 0;
        }
      });
  }
}