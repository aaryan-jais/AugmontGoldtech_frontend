import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html'
})
export class ProductComponent {

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products: any[] = [];
  categories: any[] = []; 

  page = 1;
  limit = 6;
  search = '';

  editId: string = '';
  selectedFile: File | null = null;

  product = {
    name: '',
    price: '',
    categoryId: ''
  };

  ngOnInit() {
    this.load();
    this.loadCategories();
  }

  load() {
    this.productService.getAll(this.page, this.limit, this.search)
      .subscribe((res: any) => {
        this.products = res.rows || [];
      });
  }

  loadCategories() {
    this.categoryService.getAll()
      .subscribe((res: any) => {
        this.categories = res || [];
      });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {

    const formData = new FormData();

    formData.append("name", this.product.name);
    formData.append("price", this.product.price);
    formData.append("categoryId", this.product.categoryId);

    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }

    if (this.editId) {

      this.productService.update(this.editId, formData)
        .subscribe(() => {
          this.cancel();
          this.load();
        });

    } else {

      this.productService.create(formData)
        .subscribe(() => {
          this.cancel();
          this.load();
        });
    }
  }

  edit(p: any) {

    this.editId = p.id;

    this.product = {
      name: p.name,
      price: p.price,
      categoryId: p.categoryId || p.CategoryId
    };
  }

  delete(id: string) {

    if (confirm("Delete product?")) {

      this.productService.delete(id)
        .subscribe(() => this.load());
    }
  }

  cancel() {
    this.editId = '';
    this.product = { name: '', price: '', categoryId: '' };
    this.selectedFile = null;
  }

  next() {
    this.page++;
    this.load();
  }

  previous() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}