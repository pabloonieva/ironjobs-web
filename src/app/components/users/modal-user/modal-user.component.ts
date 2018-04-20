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
    console.log(this.user);
   this.usersService.list()
   .subscribe((users: Array<User>) => this.users = users);
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onClickEdit(id: any, content) {
    this.usersService.currentUser(this.user);
    this.modal = this.modalService.open(content);
      console.log(id);
  }
  onSubmitEdit() {
    this.usersService.edit(this.user)
    .subscribe();
  }
}
