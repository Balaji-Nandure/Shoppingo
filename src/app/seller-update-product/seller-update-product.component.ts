import { ProductService } from './../services/product.service';
import { Product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  productData: Product | undefined;

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.log(typeof productId);

    if (productId) {
      this.product.getProduct(productId).subscribe((data) => {
        // console.log(data);
        this.productData = data;
      });
    }
  }

  submit(data: any) {}
}
