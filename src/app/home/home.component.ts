import { Product } from './../data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  treandyProducts: undefined | Product[];

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.treandyProducts().subscribe((data) => {
      this.treandyProducts = data;
      // console.log(data);
    });
  }
}
