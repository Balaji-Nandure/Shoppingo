import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { signup, login } from './../data-type';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  invalidUserAuth = new EventEmitter<boolean>(false);

  userSignup(user: signup) {
    // console.log(user);
    this.http
      .post('http://localhost:3000/users', user, {
        observe: 'response',
      })
      .subscribe((res) => {
        // console.log(res);
        if (user) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.router.navigate(['/']);
        }
      });
  }

  userLogin(data: login) {
    this.http
      .get(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body?.length) {
          // console.log(result.body);
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
