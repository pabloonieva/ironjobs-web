import { Component, OnInit } from '@angular/core';
import { OffersService } from './../../shared/services/offers.service';
import { Offer } from './../../shared/model/offer.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  offer: Offer = new Offer();
  apiError: string;

  constructor(
    private offersService: OffersService,
    private router: Router
  ){}

  onSubmitOffer(){
    this.offersService.create(this.offer)
      .subscribe(() => {
          this.router.navigate(['/offers'])
      },
      (error) => {
          this.apiError = error;
      }
    )
  }

  ngOnInit() {

  }

}
