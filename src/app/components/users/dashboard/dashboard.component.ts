import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../../shared/services/users.service';
import { User } from './../../../shared/model/user.model';
import { SessionService } from './../../../shared/services/session.services';
import { Component, OnInit, NgModule, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { ModalUserComponent } from '../modal-user/modal-user.component';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: Array<User> = [];
  @Input() user: User = new User();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private sessionService: SessionService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    if (this.sessionService.getUser()) {
      this.usersService.list()
      .subscribe((users: Array<User>) => this.users = users);
    }
  }
  onClickDelete(id: string) {
    if (window.confirm('Are you sure?')) {
      this.usersService.delete(id)
        .subscribe(() => {
          this.users = this.users.filter(user => user._id !== id);
        });
    }
  }
  onClickEdit(user: User) {
    const modalRef = this.modalService.open(ModalUserComponent);
    modalRef.componentInstance.user = Object.assign({}, this.user);
  }
}
