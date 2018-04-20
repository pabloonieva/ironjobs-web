import { User } from './../../../shared/model/user.model';
import { SessionService } from './../../../shared/services/session.services';
import { Component, NgModule, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Router } from '@angular/router';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() text: any;
  @Input() navBar: boolean = true;
  user: User = new User();
  apiError: string;
  closeResult: string;
  modal: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private sessionService: SessionService,
    private router: Router
  ) { }

  open(content) {
    this.modal = this.modalService.open(content);
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
  onSubmitLogin(loginForm) {
    this.sessionService.authenticate(this.user).subscribe(
      (user) => {
        loginForm.reset();
        this.modal.close();
        this.router.navigate(['/offers']);
      },
      (error) => {
        this.apiError = error.message;
      }
    );
  }
}
