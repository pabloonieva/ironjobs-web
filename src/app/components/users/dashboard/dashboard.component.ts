import { UsersService } from './../../../shared/services/users.service';
import { User } from './../../../shared/model/user.model';
import { SessionService } from './../../../shared/services/session.services';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: Array<User> = [];
  constructor(
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.userService.list()
    .subscribe((users: Array<User>) => this.users = users);
  }

}
