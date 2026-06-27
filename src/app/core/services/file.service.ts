import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private http = inject(HttpClient);

  // 🔥 CSV UPLOAD
  uploadCSV(file: File) {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${environment.apiUrl}/upload/csv`,
      formData
    );
  }

  uploadExcel(file: File) {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${environment.apiUrl}/upload/excel`,
      formData
    );
  }

  downloadCSV() {
    return this.http.get(
      `${environment.apiUrl}/upload/csv`,
      { responseType: 'blob' }
    );
  }

  downloadExcel() {
    return this.http.get(
      `${environment.apiUrl}/upload/excel`,
      { responseType: 'blob' }
    );
  }
}