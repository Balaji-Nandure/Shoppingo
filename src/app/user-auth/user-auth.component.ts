import { UserService } from './../services/user.service';
import { signup } from './../data-type';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  constructor(private user: UserService) {}

  signup(data: signup) {
    // console.log(data);
    this.user.userSignup(data);
  }
}
