import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { StandardService } from '../standard.service';
import { filter, findIndex } from 'lodash';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  idcard: any;
  idforeign: any;
  passport: any;
  nationality: any;
  titleName: any;
  firstName: any;
  lastName: any;
  gender: any;
  telephone: any;
  telephoneBoss: any;
  year: any;
  doctype: any;
  NationalityType: any;
  otp: any;

  subDistrictCode: any;
  districtCode: any;
  provinceCode: any;

  subDistrictName: any;
  districtName: any;
  provinceName: any;

  subDistrict: any;
  district: any;
  province: any;

  districtFilter: any;
  subDistrictFilter: any;

  modal: any = false;
  modalDoc: any = false;
  modalFinish: any = false;

  userId: any;
  filesToUpload: any;
  fileName: any;

  otpPass: any = {};

  constructor(
    private alertService: AlertService,
    private standardService: StandardService,
    private route: Router
  ) { }

  async ngOnInit() {
    await this.getProvince();
    await this.getDistrict();
    await this.getSubDistrict();
  }

  async getProvince() {
    try {
      const rs: any = await this.standardService.getProvince();
      if (rs.ok) {
        this.province = rs.rows;
        console.log(this.province[0]);

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getDistrict() {
    try {
      const rs: any = await this.standardService.getDistrict();
      if (rs.ok) {
        this.district = rs.rows;
        console.log(this.district[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getSubDistrict() {
    try {
      const rs: any = await this.standardService.getSubDistrict();
      if (rs.ok) {
        this.subDistrict = rs.rows;
        console.log(this.subDistrict[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async filterDistrict(provinceCode) {
    this.districtFilter = filter(this.district, { province_code: provinceCode });

  }

  async filterSubDistrict(provinceCode, districtCode) {
    this.subDistrictFilter = filter(this.subDistrict, { province_code: provinceCode, ampur_code: districtCode });
  }

  onClickChangeLangue() {
    this.route.navigate(['langual']);
  }

  async submit() {
    const rs: any = await this.standardService.otp(this.telephone);
    console.log(rs);
    if (rs.ok) {
      this.otpPass.telephone = rs.phone_number;
      this.otpPass.transactionId = rs.transaction_id;
      this.otpPass.vendor = rs.vendor;
      this.modal = true;
    }
  }

  async confirm() {
    try {
      this.otpPass.otp = this.otp;
      console.log(this.otpPass);
      const rs: any = await this.standardService.otpConfirm(this.otpPass);
      console.log(rs);
      if (rs.ok) {
        const obj: any = {};
        obj.firstName = this.firstName;
        obj.lastName = this.lastName;
        obj.titleName = this.titleName;
        obj.birthDate = this.year;
        obj.telephone = this.telephone;
        obj.cid = this.idcard === undefined ? this.idforeign : this.idcard;
        obj.passport = this.passport;
        obj.nationTypeId = this.NationalityType;
        obj.gender = this.gender;
        obj.telephoneBoss = this.telephoneBoss;
        console.log(obj);

        const userId: any = await this.standardService.savePreRegister(obj, rs.token);
        console.log(userId);
        if (rs.ok) {
          this.modalDoc = true;
        }
        this.modal = false;
      } else {
        this.otp = null;
        this.alertService.error('OTP ไม่ถูกต้อง');
        this.modal = false;
      }

    } catch (error) {
      this.modal = false;
    }
  }

  onChangeProvince() {
    const idx: any = findIndex(this.province, { code: this.provinceCode });
    this.provinceName = this.province[idx].name_en;
    this.filterDistrict(this.provinceCode);
  }

  onChangeDistrict() {
    const idx: any = findIndex(this.district, { code: this.districtCode });
    this.districtName = this.district[idx].name_th;
    this.filterSubDistrict(this.provinceCode, this.districtCode);
  }

  onChangeSubDistrict() {
    const idx: any = findIndex(this.subDistrict, { code: this.subDistrictCode });
    this.subDistrictName = this.subDistrict[idx].name_en;
  }

  onChangeDoc(fileInput: any) {
    this.filesToUpload = null;
    this.filesToUpload = fileInput.target.files[0];
    if (this.filesToUpload) {
      this.fileName = fileInput.target.files[0].name;
    }
  }

  async upload() {
    try {
      // const rs: any = await this.standardService.uploadFile(this.filesToUpload, this.userId);
      // if (rs.ok) {
      //   this.fileName = null;
      //   this.filesToUpload = null;
      //   this.alertService.success();
      // }
      this.modalDoc = false;
      this.modalFinish = true;
    } catch (error) {
      console.log(error);
    }
  }

  clearForm() {
    this.passport = null;
    this.idcard = null;
    this.idforeign = null;
    this.nationality = null;
    this.NationalityType = null;
    this.titleName = null;
    this.firstName = null;
    this.lastName = null;
    this.telephone = null;
    this.telephoneBoss = null;
    this.year = null;
    this.gender = null;
    this.doctype = null;
  }
}
