import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellerName = '';
  searchResult: undefined | product[];
  userName:string = '';

  constructor(
    private router: Router,
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val:any) => {
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if(localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name
          }
        } else if(localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user'
        } else {
          this.menuType = 'default'
        }
      }
      
    })
  }

  searchProduct(query: KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
     this.product.searchProducts(element.value).subscribe((result: any) => {
      if(result.length > 5) {
        result.length = 5
      }
        this.searchResult = result;
      })
      
    }
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }

  hideSearch() {
    this.searchResult = undefined
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`])
  }

  redirectToDetails(id: number) {
    this.router.navigate(['details/'+id])
  }

}
