import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ChatMessages } from '../model/chat-messages';
import { MessagesService } from '../service/messages.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private messagesService: MessagesService, private authService: AuthService, private userService: UserService) { }
  public innerHeight: any;
  public messages: Array<ChatMessages> = [];
  public resentMessages: Array<ChatMessages> = [];
  public user: User;
  public toUser: User;
  public users: User[];
  public resentUsers: User[] = [];
  public preparedMsg = '';
  @ViewChild('searchBy') el:ElementRef;
  ngOnInit() {
    this.innerHeight = window.innerHeight - 56;
    this.loadLoggedUser();
    this.loadChatChatMessages(2);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight - 56;
  }

  loadChatChatMessages(toId) {
    this.messagesService.getMessages(this.user.id, toId).subscribe(res => {
      this.messages = [];
      this.messages = res;
      this.resentMessages = res;
    })
  }

  sendMessage() {
    debugger
    let message = new ChatMessages;
    message.fromId = this.user.id;
    message.toId = this.toUser.id;
    message.message = this.preparedMsg;
    message.sentDate = new Date().toISOString();
    this.messagesService.sendMessage(message).subscribe(res => {
      this.loadChatChatMessages(this.toUser.id);
    });;
    this.preparedMsg = '';
  }

  preparedMsgChange(event) {
    this.preparedMsg = event.target.value;
  }

  loadLoggedUser() {
    this.user = this.authService.getLoggedUser();
  }

  filter(event) {
    this.userService.filter(event.target.value).subscribe(resp => {
      this.users = resp;
    });
  }

  autoSelect(user: MatAutocompleteSelectedEvent) {
    this.resentUsers.push(user.option.value);
    this.toUser = user.option.value;
    this.loadChatChatMessages(this.toUser.id);
    this.el.nativeElement.value='';
  }
}
