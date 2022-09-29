import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[];
  productMessage = "";
  icon = faTrash;

  constructor( private producService: ProductService  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.producService.productList().subscribe((result) => {
      this.productList = result;
    })
  }

  deleteProduct(id: number){
    this.producService.deleteProduct(id).subscribe((result) => {
      if(result) {
        this.productMessage = "Product is deleted"
      }
    this.getProducts();
    })

    setTimeout(() => {
        this.productMessage = '';
    }, 3000);
  }

}
