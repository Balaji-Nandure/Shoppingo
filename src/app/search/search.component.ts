import { Product } from './../data-type';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | Product[];

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    // console.log(this.activeRoute);
    let query = this.activeRoute.snapshot.paramMap.get('query');
    // console.log(query);

    query &&
      this.product.searchProducts(query).subscribe((data) => {
        // console.log(data);
        this.searchResult = data;
      });
  }
}
