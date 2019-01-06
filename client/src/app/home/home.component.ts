import { Component, OnInit, HostListener } from '@angular/core';
import { ChatMessages } from '../model/chat-messages';
import { MessagesService } from '../service/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private messagesService: MessagesService) { }
  public innerHeight: any;
  public messages: Array<ChatMessages> = [];
  public resentMessages: Array<ChatMessages> = [];
  public userId = 1;
  public preparedMsg = '';
  ngOnInit() {
    this.innerHeight = window.innerHeight - 56;
    this.loadChatChatMessages();
    this.loadChatContacts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight - 56;
  }

  loadChatChatMessages() {

    this.messagesService.getMessages().subscribe(res => {
      this.messages = [];
      this.messages = res;
      this.resentMessages = res;
    })
  }

  sendMessage() {
    debugger
    let message = new ChatMessages;
    message.id = 2;
    message.fromId = this.userId;
    message.toId = 1
    message.message = this.preparedMsg;
    message.sentDate = new Date().toDateString();
    this.messagesService.sendMessage(message);
    this.loadChatChatMessages();
    this.preparedMsg = '';
  }

  preparedMsgChange(event) {
    this.preparedMsg = event.target.value;
  }

  loadChatContacts() {
  }
}
