import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  key: any = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  otp() {
    if (this.key.length === 6) {
      this.router.navigate(['/home']);
    }
  }

}
