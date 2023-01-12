import { Product } from '../data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productsList: Product[] | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.productList().subscribe((res) => {
      console.log(res);
      this.productsList = res;
    });
  }
}
