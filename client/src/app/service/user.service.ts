import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl: string = '/api/v1/user';
  constructor(private http: HttpClient) {

  }

  filter(match: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/find?match=' + match);
  }
}
