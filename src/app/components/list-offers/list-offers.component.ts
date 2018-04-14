import { Component, OnInit } from '@angular/core';
import { OffersService } from './../../shared/services/offers.service';
import { SessionService } from './../../shared/services/session.services';
import { Offer } from './../../shared/model/offer.model';
import { User } from './../../shared/model/user.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})

export class ListOffersComponent implements OnInit {
  offers: Array<Offer> = [];
  user: User = new User();
  offer: Offer = new Offer();
  apiError: string;

  constructor(
    private router: Router,
    private offersService: OffersService,
    private sessionService: SessionService
  ){}

  ngOnInit() {
    this.offersService.list()
      .subscribe((offers: Array<Offer>) => this.offers = offers);
    this.user = this.sessionService.getUser();
  }

  onClickDelete(id: string){
    if (window.confirm('Are you sure?')) {

      this.offersService.delete(id)
        .subscribe(() => {
          this.offers = this.offers.filter(offer => offer._id !== id);
        });
    }
  }

  onClickSeeForm(){
    $('#newJobForm').toggleClass("hideForm");
  }

  onSubmitOffer(){
    this.offersService.create(this.offer)
      .subscribe(offer => {
          this.offers.push(offer);
          this.offer = new Offer();
      },
      (error) => {
          this.apiError = error;
      }
    )
  }

}
