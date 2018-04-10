import { User } from './../model/user.model';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';


const CURRENT_USER_KEY = 'currentUser';

@Injectable()
export class SessionService {
  private static readonly BASE_API = `${environment.baseApi}`;
  private static defaultHeaders: Headers = new Headers({ 'Content-Type': 'application/json' });
  private static defaultOptions: RequestOptions = new RequestOptions({ headers: SessionService.defaultHeaders, withCredentials: true });

 private user: User;
  private userSubject: Subject<User>;

 constructor(private http: Http) {
    this.user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    this.userSubject = new Subject<User>();
  }

 onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }

 handleError(e) {
    return Observable.throw(e.json().message);
  }

  authenticate(user: User): Observable<User> {
    return this.http.post(`${SessionService.BASE_API}/session/`, JSON.stringify(user),  SessionService.defaultOptions)
      .map(res => {
        return this.doAuthentication(res.json());
      })
      .catch(this.handleError);
  }

  private doAuthentication(user: User): User {
    this.user = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.user));
    this.notifyUserChanges();
    return this.user;
  }

  private notifyUserChanges() {
    this.userSubject.next(this.user);
  }

  logout(): Observable<void> {
    return this.http.delete(`${SessionService.BASE_API}/session/`, SessionService.defaultOptions)
      .map(res => {
        return this.doLogout();
      })
      .catch(error => this.handleError(error));
  }

  protected doLogout(): void {
    this.user = null;
    localStorage.removeItem(CURRENT_USER_KEY);
    this.notifyUserChanges();
  }
}
