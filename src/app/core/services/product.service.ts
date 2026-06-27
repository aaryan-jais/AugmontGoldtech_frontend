import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) {}

  getAll(page: number, limit: number, name: string) {
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${limit}&name=${name}`);
  }

  create(data: FormData) {
    return this.http.post(this.baseUrl, data);
  }

  update(id: string, data: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}