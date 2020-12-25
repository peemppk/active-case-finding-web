import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  name: any;
  lastname: any;
  gender: any;
  telephone: any;
  year: any;
  doctype: any;

  tambonName: any;
  ampurName: any;
  provinceName: any;

  tambon: any = [{ name: 'Banplaw' }, { name: 'Banprik' }];
  ampur: any = [{ name: 'Banna' }, { name: 'Mueng' }];
  province: any = [{ name: 'Nakhon Nayok' }, { name: 'Buriram' }];

  modal: any = false;

  constructor(
    private alertService: AlertService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  onClickChangeLangue() {
    this.route.navigate(['langual']);
  }

  async submit() {
    this.modal = true;
    console.log(this.name, this.lastname, this.gender, this.telephone, this.year, this.tambon, this.ampur, this.province);
  }

  async confirm() {
    this.alertService.success();
    this.modal = false;
  }

}
