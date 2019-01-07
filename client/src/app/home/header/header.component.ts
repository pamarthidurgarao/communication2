import { Component, OnInit } from '@angular/core';
import { AUTH_KEY } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem(AUTH_KEY);
    this.router.navigate(['login']);
  }
}
