import { NgForm } from '@angular/forms';
import { UsersService } from './../../../shared/services/users.service';
import { User } from './../../../shared/model/user.model';
import { SessionService } from './../../../shared/services/session.services';
import { Component, NgModule, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {
  @Input() user: User;
  users: Array<User> = [];
  apiError: string;
  closeResult: string;
  modal: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private sessionService: SessionService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
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
  onSubmitEdit(editForm: NgForm) {
    console.log(this.user);
    this.usersService.edit(this.user)
    .subscribe((user) => {
    this.router.navigate(['/home']);
    }
  );
  }
}