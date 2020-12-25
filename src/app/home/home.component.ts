import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  name: any;
  lastname: any;
  gender: any;

  tambon: any = ['Banplaw', 'Banprik'];
  ampur: any = ['Banna', 'Mueng'];
  province: any = ['Nakhon Nayok', 'Buriram'];

  constructor() { }

  ngOnInit() {
  }

}
