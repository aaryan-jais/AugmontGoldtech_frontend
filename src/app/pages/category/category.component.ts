import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html'
})
export class CategoryComponent {

  private service = inject(CategoryService);

  categories: any[] = [];

  name = '';

  editId = '';

  ngOnInit() {
    this.load();
  }

  load() {

    this.service.getAll().subscribe((res: any) => {

      console.log(res);

      this.categories = res.rows ?? res;

    });

  }

  save() {

    if (!this.name.trim()) {
      alert("Enter Category Name");
      return;
    }

    if (this.editId) {

      this.service.update(this.editId, {
        name: this.name
      }).subscribe(() => {

        this.cancel();

        this.load();

      });

    } else {

      this.service.create({
        name: this.name
      }).subscribe(() => {

        this.cancel();

        this.load();

      });

    }

  }

  edit(item: any) {

    this.editId = item.id;

    this.name = item.name;

  }

  delete(id: number) {

    if (confirm("Delete Category?")) {

      this.service.delete(id)
        .subscribe(() => {

          this.load();

        });

    }

  }

  cancel() {

    this.name = '';

    this.editId = '';

  }

}