import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchProducts: product[] | undefined;

  constructor( private activeRoute: ActivatedRoute,
    private productService: ProductService ) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.productService.searchProducts(query).subscribe((result) => {
      this.searchProducts = result;
    })
  }

}
