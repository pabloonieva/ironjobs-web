import { User } from './../../shared/model/user.model';
import { SessionService } from './../../shared/services/session.services';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text: any = "IronJobs";
  navBar: boolean = false;
  user: User;
  userSubscription: Subscription;
  modal: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.userSubscription = this.sessionService.onUserChanges()
      .subscribe(user => this.user = user);
  }

  open(content) {
    this.modal = this.modalService.open(content);
  }

}
