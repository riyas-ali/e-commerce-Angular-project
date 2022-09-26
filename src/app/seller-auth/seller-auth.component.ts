import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
import { SellService } from '../services/sell.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  showLogin = true;
  authError = '';

  constructor(
    private seller: SellService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  
  openLogin() {
    this.showLogin = true;
  }
  
  openSignup() {
    this.showLogin = false;
  }
  
  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  login(data: any) {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = "Email And Password Doesn't Match"
      }
    })
  }
}
