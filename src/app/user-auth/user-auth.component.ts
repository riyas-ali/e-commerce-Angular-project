import { Component, OnInit } from '@angular/core';
import { login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  showLogin = true;
  authError: undefined;

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(val: SignUp) {
    this.userService.userSignup(val);
  }

  openLogin() {
    this.showLogin = true;
  }

  login(val: login) {
    console.warn(val);
  }

  openSignup() {
    this.showLogin = false;
  }

}
