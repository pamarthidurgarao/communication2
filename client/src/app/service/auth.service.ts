import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const AUTH_KEY = 'loggedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string = '/api/v1/user';
  public user: User;
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): boolean {
    debugger
    const data = window.localStorage.getItem(AUTH_KEY);
    if (data) {
      this.user = JSON.parse(data);
      if (this.user.email === email && this.user.password === window.atob(password)) {
        return true;
      }
    }
    this.http.get<User>(this.baseUrl + "/mail/" + email).subscribe(res => {
      this.user = res;
      if (this.user.email === email && this.user.password === window.atob(password)) {
        this.storeLocal();
        return true;
      }
    });
    return false;
  }

  storeLocal() {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(this.user));
  }

  saveUser(user: User): Observable<User> {
    user.password = window.atob(user.password);
    return this.http.post<User>(this.baseUrl, user);
  }

  getLoggedUser():User{
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  }
}
