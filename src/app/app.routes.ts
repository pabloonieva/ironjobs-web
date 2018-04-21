import { DashboardComponent } from './components/users/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: DashboardComponent },
    { path: 'offers', component: ListOffersComponent},
    { path: 'offers/:id', component: OfferItemComponent }
];
