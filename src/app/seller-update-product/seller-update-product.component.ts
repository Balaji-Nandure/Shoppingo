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
  productMessage: string | undefined;

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

  submit(data: Product) {
    // console.log(data);
    // while fetching data the id is undefined, so push id in the data:Product

    if (this.productData) {
      data.id = this.productData.id;
    }

    this.product.updateProduct(data).subscribe((res) => {
      // console.log(res);
      if (res) {
        this.productMessage = 'Product has updated';
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
