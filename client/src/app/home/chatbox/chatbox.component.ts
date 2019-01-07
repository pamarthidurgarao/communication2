import { Component, OnInit, HostListener } from '@angular/core';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { ChatMessages } from '../../model/chat-messages';
import { AuthService } from '../../service/auth.service';
import { MessagesService } from '../../service/messages.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  public toUser: User;
  public messages: Array<ChatMessages> = [];
  public user: User;
  public innerHeight: any;
  public preparedMsg = '';
  constructor(private route: ActivatedRoute, private messagesService: MessagesService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    debugger
    this.loadLoggedUser();
    const user = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.get(parseInt(params.get('id')))
      ));
    user.subscribe(resp => {
      this.toUser = resp;
      this.loadChatChatMessages(this.toUser.id);
    })
    this.innerHeight = window.innerHeight - 56;
  }
  loadChatChatMessages(toId) {
    this.messagesService.getMessages(this.user.id, toId).subscribe(res => {
      this.messages = [];
      this.messages = res;
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight - 56;
  }
  loadLoggedUser() {
    this.user = this.authService.getLoggedUser();
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
}
