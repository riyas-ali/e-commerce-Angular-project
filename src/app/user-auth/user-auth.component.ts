import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  showLogin = true;
  authError = '';

  constructor( private userService: UserService, private productService: ProductService ) { }

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
    this.userService.userLogin(val);
    this.userService.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = "Email And Password Doesn't Match"
      }else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 300);
      }
    })
  }
  
  openSignup() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data) {
      let cartDataList:product[] = JSON.parse(data);
      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
            }
          })
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }
      });
    }
    setTimeout(() => {
    this.productService.getCartList(userId);
    }, 2000);
  }

}
