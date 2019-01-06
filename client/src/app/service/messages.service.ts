import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChatMessages } from '../model/chat-messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public messages: Array<ChatMessages> = [];
  constructor(private http: HttpClient) { 
    this.messages = [];
    let message = new ChatMessages;
    message.id = 1;
    message.fromId = 1
    message.toId = 2
    message.message = 'Test which is a new approach to have all solutionsTest which is a new approach to have all solutionsTest which is a new approach to have all solutionsTest which is a new approach to have all solutions';
    message.sentDate = '2008-11-11 13:23:44';
    this.messages.push(message);
    let message1 = new ChatMessages;
    message1.id = 2;
    message1.fromId = 2
    message1.toId = 1
    message1.message = 'Test which is a new approach to have all solutions';
    message1.sentDate = '2008-11-11 13:23:44';
    this.messages.push(message1);
  }

  getMessages(): Observable<ChatMessages[]> {
    return of(this.messages);
  }

  sendMessage(message: ChatMessages): Observable<ChatMessages[]> {
    this.messages.push(message)
    return of(this.messages);
  }
}
