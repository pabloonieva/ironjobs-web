import { NgForm } from '@angular/forms';
import { UsersService } from './../../../shared/services/users.service';
import { User } from './../../../shared/model/user.model';
import { SessionService } from './../../../shared/services/session.services';
import { Component, NgModule, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  @Input() user: User;
  users: Array<User> = [];
  apiError: string;
  closeResult: string;
  modal: NgbModalRef;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private sessionService: SessionService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
   this.usersService.list()
   .subscribe((users: Array<User>) => this.users = users);
  }

  onSubmit() {
    this.isNewUser() ? this.createUser() : this.updateUser();
    this.router.navigate(['/users']);
  }

  getTitle(): string {
    return this.isNewUser() ? 'New User' : 'Edit User';
  }

  private isNewUser() {
    return this.user._id === undefined;
  }

  private createUser() {
    this.usersService.create(this.user)
      .subscribe(() => {
        this.user = new User();
        this.activeModal.close();
        this.router.navigate(['/users']);
      });
  }

  private updateUser() {
    this.usersService.edit(this.user).subscribe(() => {
      this.user = new User();

      this.activeModal.close();
    });
  }
}
