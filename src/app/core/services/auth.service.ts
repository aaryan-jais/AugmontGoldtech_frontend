import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
providedIn:'root'
})
export class AuthService{

private http=inject(HttpClient);

login(data:any){
return this.http.post(`${environment.apiUrl}/auth/login`,data);
}

register(data:any){
return this.http.post(`${environment.apiUrl}/auth/register`,data);
}

saveToken(token:string){
localStorage.setItem("token",token);
}

getToken(){
return localStorage.getItem("token");
}

logout(){
localStorage.removeItem("token");
}

isLoggedIn(){
return !!localStorage.getItem("token");
}

}