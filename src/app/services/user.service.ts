import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient, private router:Router ) { }

  isLoginError = new EventEmitter<boolean>(false);

  userSignup(user: SignUp) {
    this.http.post('http://localhost:3000/user',user,{observe:'response'}).subscribe((result) => {
      if(result) {
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/'])
      }
    })
  }

  userAuthReload() {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }

  userLogin(user: login) {
    this.http.get(`http://localhost:3000/user?email=${user.email}&password=${user.password}`, {observe: 'response'}).subscribe((result: any) => {
      if(result && result.body && result.body?.length) {
        this.isLoginError.emit(false)
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      } else {
        this.isLoginError.emit(true)
      }
    })
  }

}
