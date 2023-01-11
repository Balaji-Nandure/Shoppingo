import { Router } from '@angular/router';
import { SellerService } from './../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}

  showLogin: boolean = false;
  authError = false;

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signup(data: signup): void {
    // console.log(data);
    this.seller.userSignUp(data);
  }

  login(data: signup): void {
    // console.log(data);
    // this.authError = false;
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((err) => {
      if (err) {
        this.authError = true;
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }
}
