import { Component, OnInit } from '@angular/core';
import { OffersService } from './../../shared/services/offers.service';
import { Offer } from './../../shared/model/offer.model';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})

export class ListOffersComponent implements OnInit {
  offers: Array<Offer> = [];

  constructor(private offerService: OffersService) { }

  ngOnInit() {
    this.offerService.list()
      .subscribe((offers) => this.offers = offers)
  }

}
