import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
selector:'app-login',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent{

email='';
password='';

private auth=inject(AuthService);
private router=inject(Router);

login(){

this.auth.login({

email:this.email,
password:this.password

}).subscribe({

next:(res:any)=>{

this.auth.saveToken(res.token);

this.router.navigate(['/dashboard']);

},

error:()=>{

alert("Invalid Credentials");

}

});

}

}