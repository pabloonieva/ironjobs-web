import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

import 'rxjs';

import { AppComponent } from './app.component';
import { SessionService } from './shared/services/session.services';
import { OffersService } from './shared/services/offers.service';
import { routes } from './app.routes';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/misc/modal/modal.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ModalComponent,
    ListOffersComponent,
    HomeComponent,
    OfferItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService, OffersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
