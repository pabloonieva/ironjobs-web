import { Component, OnInit } from '@angular/core';
import { OffersService } from './../../shared/services/offers.service';
import { Offer } from './../../shared/model/offer.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent implements OnInit {
  offer: Offer = new Offer();
  error: Object;

  constructor(
    private router: Router,
    private offersService: OffersService){ }

  onClickDelete(){
    if (window.confirm('Are you sure?')) {
      this.offersService.delete(this.offer.id)
        .subscribe(() => {
          this.router.navigate(['/phones']);
        });
    }
  }

  ngOnInit() {
  }

}
