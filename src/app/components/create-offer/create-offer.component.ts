import { Component, OnInit } from '@angular/core';
import { OffersService } from './../../shared/services/offers.service';
import { Offer } from './../../shared/model/offer.model';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  offer: Offer: Array<offers>;

  constructor() { }

  ngOnInit() {
  }

}
