import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';

  constructor(private route: Router) {}

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
}
