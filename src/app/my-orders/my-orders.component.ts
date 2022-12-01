import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orderData: order[] | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.productService.cancelOrder(orderId).subscribe((result) => {
     this.getOrderList();
    })
  }

  getOrderList() {
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }

}
