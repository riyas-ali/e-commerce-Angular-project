import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };
  noItemsInCart = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * item?.quantity);
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + ( price/10 ) + 100 - ( price/10 );
      if(this.cartData?.length == 0) {
        this.noItemsInCart = true;
      }
    })
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  removeItem(cartId: number | undefined) {
    cartId && this.cartData && this.productService.removeFromCart(cartId).subscribe((result) => {
      if(result) {
        this.getCartItems();
      }
    })
  }

}
