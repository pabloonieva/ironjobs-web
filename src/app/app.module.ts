import { DashboardComponent } from './components/users/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs';

import { AppComponent } from './app.component';
import { SessionService } from './shared/services/session.services';
import { OffersService } from './shared/services/offers.service';
import { UsersService } from './shared/services/users.service';
import { routes } from './app.routes';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/misc/modal/modal.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { ModalUserComponent } from './components/users/modal-user/modal-user.component';
import { ModalEditComponent } from './components/users/modal-edit/modal-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ModalComponent,
    ListOffersComponent,
    HomeComponent,
    OfferItemComponent,
    DashboardComponent,
    ModalUserComponent,
    ModalEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [SessionService, OffersService, UsersService],
  entryComponents: [
    ModalUserComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
