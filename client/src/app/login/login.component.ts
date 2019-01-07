import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loadForm();
  }

  login() {
    debugger
    const isLogged = this.authService.login(this.loginForm.get('email').value, this.loginForm.get('pwd').value);
    if (isLogged) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login'])
    }
  }

  loadForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      pwd: new FormControl(''),
    });
  }
}
