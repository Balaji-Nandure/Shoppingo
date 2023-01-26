import { UserService } from './../services/user.service';
import { signup, login } from './../data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signup(data: signup) {
    // console.log(data);
    this.user.userSignup(data);
  }

  login(data: login) {
    this.user.userLogin(data);
  }

  openLogin() {
    // console.log('openLogin');
    this.showLogin = true;
  }

  openSignup() {
    // console.log('openSignup');
    this.showLogin = false;
  }
}
