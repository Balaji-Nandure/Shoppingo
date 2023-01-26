import { Product } from './../data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  // c;
  sellerName: string = '';
  userName: string = '';
  searchReasults: undefined | Product[];

  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((res: any) => {
      // console.log(res.url);
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          // console.log('in seller area');
          this.menuType = 'seller';

          // For making the seller name dynamic
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          // console.log('in default area');
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.searchProducts(element.value).subscribe((res) => {
        // console.log(res);
        if (res.length > 5) {
          res.length = 5;
        }
        this.searchReasults = res;
      });
    }
  }

  hideSuggestion() {
    this.searchReasults = undefined;
  }

  submitSearch(val: string) {
    // console.log(val);
    this.route.navigate([`search/${val}`]);
  }

  redirectToDetails(id: Number) {
    this.route.navigate([`details/${id}`]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  showSearchbar() {
    if (this.menuType === 'default' || this.menuType === 'user') {
      return true;
    }
    return false;
  }
}
