import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  idcard: any;
  titleName: any;
  firstName: any;
  lastName: any;
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
    console.log(this.firstName, this.lastName, this.gender, this.telephone, this.year, this.tambonName, this.ampurName, this.provinceName);
  }

  async confirm() {
    try {
      this.alertService.success();
      this.clearForm();
      this.modal = false;
    } catch (error) {
      this.clearForm();
      this.modal = false;
    }
  }

  onChangeImage(e) {
  }

  onChangeDoc(e) {
  }

  clearForm() {
    this.idcard = null;
    this.titleName = null;
    this.firstName = null;
    this.lastName = null;
    this.telephone = null;
    this.year = null;
    this.gender = null;
    this.tambonName = null;
    this.ampurName = null;
    this.provinceName = null;
  }
}
