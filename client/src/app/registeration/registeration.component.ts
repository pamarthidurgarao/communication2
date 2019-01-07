import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  regForm: FormGroup;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loadForm();
  }

  reg() {
    debugger
    const isLogged = this.authService.saveUser(this.regForm.value).subscribe(res => {
      this.router.navigate(['login'])
    });
  }

  loadForm() {
    this.regForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

}
