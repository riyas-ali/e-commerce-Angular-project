import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * item?.quantity);
        }
      })
      this.totalPrice = price + ( price/10 ) + 100 - ( price/10 );
    })
  }

  orderNow(data: {email: string, address: string, contact: string}) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice) {
      let orderData:order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id)
        }, 600);
      })
      this.productService.orderNow(orderData).subscribe((result) => {
        if(result) {
          this.orderMsg = "Your order is placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 400);
        }
      })
    }
  }

}
