import { User } from './../../../shared/model/user.model';
import { Observable, Subscription } from 'rxjs/Rx';
import { SessionService } from './../../../shared/services/session.services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'selenium-webdriver';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.userSubscription = this.sessionService.onUserChanges()
      .subscribe(user => this.user = user);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onClickLogout() {
    if (window.confirm('Are you sure you want to log out?')) {
    this.sessionService.logout()
      .subscribe(() =>{
        this.router.navigate(['/home']);
      });
  }  }
}
