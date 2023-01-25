import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { signup } from './../data-type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

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
}
