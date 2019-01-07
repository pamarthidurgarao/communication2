import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ChatMessages } from '../model/chat-messages';
import { MessagesService } from '../service/messages.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private messagesService: MessagesService, private router: Router, private authService: AuthService, private userService: UserService) { }
  public innerHeight: any;

  public resentMessages: Array<ChatMessages> = [];
  public toUser: User;
  public user: User;
  public users: User[];
  public resentUsers: User[] = [];

  @ViewChild('searchBy') el: ElementRef;
  ngOnInit() {
    this.loadLoggedUser();
    this.innerHeight = window.innerHeight - 56;
    this.loadRecent();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight - 56;
  }

  filter(event) {
    this.userService.filter(event.target.value).subscribe(resp => {
      this.users = resp;
    });
  }

  autoSelect(user: MatAutocompleteSelectedEvent) {
    this.resentUsers.push(user.option.value);
    this.toUser = user.option.value;
    this.el.nativeElement.value = '';
    this.router.navigate(['/chat', this.toUser.id]);
  }
  loadLoggedUser() {
    this.user = this.authService.getLoggedUser();
  }
  gotoChat(user){
    debugger
    this.toUser=user;
    this.router.navigate(['/chat', user.id]);
  }
  loadRecent() {
    this.messagesService.getResent(this.user.id).subscribe(res => {
      debugger
      res.forEach(response => {
        this.userService.get(response).subscribe(r => this.resentUsers.push(r));
      })

    })
  }
}
