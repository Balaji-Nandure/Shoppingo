import { Product } from './../data-type';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: Product | undefined;
  productQuantity: number = 1;

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log(productId);
    productId &&
      this.product.getProduct(productId).subscribe((res) => {
        // console.log(res);
        this.productData = res;
      });
  }

  handleQuantity(val: 'inc' | 'dec') {
    if (this.productQuantity < 20 && val === 'inc') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === 'dec') {
      this.productQuantity--;
    }
  }
}
