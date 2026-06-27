import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
providedIn:'root'
})

export class CategoryService{

private http=inject(HttpClient);

getAll(){

return this.http.get(`${environment.apiUrl}/category`);

}

create(data:any){

return this.http.post(`${environment.apiUrl}/category`,data);

}

update(id:any,data:any){

return this.http.put(`${environment.apiUrl}/category/${id}`,data);

}

delete(id:any){

return this.http.delete(`${environment.apiUrl}/category/${id}`);

}

}