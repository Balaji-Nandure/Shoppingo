import { Product } from '../data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productsList: Product[] | undefined;
  productDeleteMessage: string | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    // console.log(id);
    this.product.deleteProduct(id).subscribe((res) => {
      console.log(res);
      if (res) {
        this.productDeleteMessage = 'Product deleted successfully';
        this.list();
      }
    });

    setTimeout(() => {
      this.productDeleteMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((res) => {
      // console.log(res);
      if (res) {
        this.productsList = res;
      }
    });
  }
}
