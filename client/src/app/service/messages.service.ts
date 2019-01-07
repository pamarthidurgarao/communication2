import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChatMessages } from '../model/chat-messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public messages: Array<ChatMessages> = [];
  public baseUrl: string = '/api/v1/message';
  constructor(private http: HttpClient) {
  }

  getMessages(fromId: number, toId: number): Observable<ChatMessages[]> {
    return this.http.get<ChatMessages[]>(this.baseUrl + '/find/fromId/' + fromId + '/toId/' + toId)
  }

  sendMessage(message: ChatMessages): Observable<ChatMessages> {
    return this.http.post<ChatMessages>(this.baseUrl, message);
  }
}
