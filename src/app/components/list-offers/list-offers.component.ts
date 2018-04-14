import { Component, OnInit } from '@angular/core';
import { OffersService } from './../../shared/services/offers.service';
import { Offer } from './../../shared/model/offer.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})

export class ListOffersComponent implements OnInit {
  offers: Array<Offer> = [];

  constructor(
    private router: Router,
    private offersService: OffersService) { }

  ngOnInit() {
    this.offersService.list()
      .subscribe((offers: Array<Offer>) => this.offers = offers)
  }

  onClickDelete(id: string){
    if (window.confirm('Are you sure?')) {

      this.offersService.delete(id)
        .subscribe(() => {
          this.router.navigate(['/offers']);
        });
    }
  }

}
