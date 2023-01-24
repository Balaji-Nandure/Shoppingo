import { Product } from './../data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[];

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      // console.log(data);
      this.popularProducts = data;
    });
  }
}
