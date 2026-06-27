import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileService } from '../../core/services/file.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html'
})
export class UploadComponent {

  private service = inject(FileService);

  selectedFile!: File;

  select(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🔥 CSV UPLOAD
  uploadCSV() {

    if (!this.selectedFile) {
      alert("Select File");
      return;
    }

    this.service.uploadCSV(this.selectedFile)
      .subscribe({
        next: () => alert("CSV Upload Success"),
        error: () => alert("CSV Upload Failed")
      });
  }

  // 🔥 EXCEL UPLOAD
  uploadExcel() {

    if (!this.selectedFile) {
      alert("Select File");
      return;
    }

    this.service.uploadExcel(this.selectedFile)
      .subscribe({
        next: () => alert("Excel Upload Success"),
        error: () => alert("Excel Upload Failed")
      });
  }

  downloadCSV() {

    this.service.downloadCSV()
      .subscribe((data: any) => {

        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');

        a.href = url;
        a.download = "products.csv";
        a.click();
      });
  }

  downloadExcel() {

    this.service.downloadExcel()
      .subscribe((data: any) => {

        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');

        a.href = url;
        a.download = "products.xlsx";
        a.click();
      });
  }
}