import { Component, NgModule, OnInit, Input } from '@angular/core';
import { OffersService } from './../../shared/services/offers.service';
import { SessionService } from './../../shared/services/session.services';
import { User } from './../../shared/model/user.model';
import { Offer } from './../../shared/model/offer.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent implements OnInit {
@Input()  offer: Offer;
  offers: Array<Offer> = [];
  user: User = new User();
  error: Object;
  modal: NgbModalRef;
  closeResult: string;


  constructor(
    private router: Router,
    private offersService: OffersService,
    private modalService: NgbModal
  ){ }

  open(content) {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
  onClickDelete(){
    if (window.confirm('Are you sure?')) {
      this.offersService.delete(this.offer._id)
        .subscribe(() => {
          this.router.navigate(['/offers']);
        });
    }
  }

  ngOnInit() {

  }
  onClickViewDetails(offer: Offer){
    console.log(this.offer)
  }

}
