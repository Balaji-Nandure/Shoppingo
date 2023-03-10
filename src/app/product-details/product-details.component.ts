import { Product, cart } from './../data-type';
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
  removeCart = false;

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

    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: Product) => productId == item.id.toString());
      if (items.length > 0) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
  }

  handleQuantity(val: 'inc' | 'dec') {
    if (this.productQuantity < 20 && val === 'inc') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === 'dec') {
      this.productQuantity--;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      // console.log(this.productData.quantity);

      // to check if user is not logged in and
      if (!localStorage.getItem('user')) {
        // console.log(this.productData.quantity);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // else means user is logged in
        // console.log('user is logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        // here cartData.id is productId not userId
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            window.alert('Product added to cart successfully');
          }
        });
      }
    }
  }

  removeToCart(id: number) {
    this.product.removeItemFromCart(id);
    this.removeCart = false;
  }
}
