import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLogedin = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: signup) {
    this.http
      .post('http://localhost:3000/seller', data, {
        observe: 'response',
      })
      .subscribe((res) => {
        this.isSellerLogedin.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this.router.navigate(['seller-home']);
      });
    // return false;
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLogedin.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    console.log(data);
    // api call code will go here

    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        // console.log(res);
        if (res && res.body && res.body.length) {
          console.log('id and password matches');
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigate(['seller-home']);
        } else {
          console.log('id and password does not match with database');
          this.isLoginError.emit(true);
        }
      });
  }
}
