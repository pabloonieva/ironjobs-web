import { BaseApiService } from './base-api.service';
import { Offer } from '../model/offer.model'
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OffersService extends BaseApiService {
  private static readonly OFFERS_API = `${BaseApiService.BASE_API}/offers`;

  constructor(private http: Http) {
    super();
  }

  list(): Observable<Array<Offer>> {
    return this.http.get(OffersService.OFFERS_API, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  create(offer: Offer): Observable<Offer> {
    return this.http.post(OffersService.OFFERS_API, offer, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

//as form Data no se por qué lo usan

  edit(offer: Offer): Observable<Offer> {
    return this.http.put(`${OffersService.OFFERS_API}/edit/${offer._id}`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${OffersService.OFFERS_API}/delete/${id}`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

}
