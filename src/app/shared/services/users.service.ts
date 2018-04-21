import { BaseApiService } from './base-api.service';
import { User } from './../model/user.model';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';


const CURRENT_USER_KEY = 'currentUser';

@Injectable()
export class UsersService extends BaseApiService {
  private static readonly USERS_API = `${BaseApiService.BASE_API}/users`;
  private user: User;
  private userSubject: Subject<User>;

 constructor(private http: Http) {
  super();
  this.user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  this.userSubject = new Subject<User>();
  }
  
  list(): Observable<Array<User>> {
    return this.http.get(UsersService.USERS_API, BaseApiService.defaultOptions)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }
  create(user: User): Observable<User> {
    return this.http.post(UsersService.USERS_API, user, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }
  currentUser(user: User): User {
    return this.user;
  }
  edit(user: User): Observable<User>  {
    console.log(user);
    return this.http.put(`${UsersService.USERS_API}/edit/${this.user._id}`, JSON.stringify(user), BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${UsersService.USERS_API}/delete/${id}`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

}
