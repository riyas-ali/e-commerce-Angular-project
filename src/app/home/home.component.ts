import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularProducts: undefined | product[];
  trendingProducts: undefined | product[];

  constructor(private product: ProductService  ) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    })

    this.product.trendyProducts().subscribe((data) => {
      this.trendingProducts = data;
    })
  }

}
