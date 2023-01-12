import { Product } from '../data-type';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) {}

  submit(data: Product) {
    // console.log(data);
    this.product.addProduct(data).subscribe((res) => {
      console.log(res);

      if (res) {
        this.addProductMessage = 'Product added Successfully';
      }

      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 3000);
    });
  }
}
