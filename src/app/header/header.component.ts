import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((res: any) => {
      // console.log(res.url);
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          // console.log('in seller area');
          this.menuType = 'seller';
        } else {
          // console.log('in default area');
          this.menuType = 'default';
        }
      }
    });
  }
}
