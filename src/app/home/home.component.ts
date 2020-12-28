import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../alert.service';
import { StandardService } from '../standard.service';
import { filter, findIndex } from 'lodash';
import { CameraComponent } from '../camera/camera.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
  otpRef: any;
  year: any;
  doctype: any;
  NationalityType: any = 6;
  otp: any;
  btnOtpDisabled = false;
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
  language: any;

  value: any;
  values: any;
  codeList: any = [];
  elementType: any = 'svg';
  format: any = 'CODE128';
  lineColor: any = '#000000';
  width: any = 2;
  height: any = 100;
  displayValue: any = true;
  fontOptions: any = '';
  font: any = 'monospace';
  textAlign: any = 'center';
  textPosition: any = 'bottom';
  textMargin: any = 2;
  fontSize: any = 20;
  background: any = '#ffffff';
  margin: any = 10;
  marginTop: any = 10;
  marginBottom: any = 10;
  marginLeft: any = 10;
  marginRight: any = 10;
  @ViewChild('camera') camera: CameraComponent;
  constructor(
    private alertService: AlertService,
    private standardService: StandardService,
    private route: Router
  ) { }


  async ngOnInit() {
    await this.getProvince();
    await this.getDistrict();
    await this.getSubDistrict();
    this.language = localStorage.getItem('language') || 'EN';
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
    this.modal = true;
  }

  async requestOTP() {
    this.btnOtpDisabled = true;
    try {
      const rs: any = await this.standardService.otp(this.telephone);
      console.log(rs);
      if (rs.ok) {
        this.otpRef = rs.otp_ref;
        this.otpPass.telephone = rs.phone_number;
        this.otpPass.telephone = rs.phone_number;
        this.otpPass.transactionId = rs.transaction_id;
        this.otpPass.vendor = rs.vendor;
        // this.modal = true;
      } else {
        this.btnOtpDisabled = false;
        this.alertService.error(rs.error);
      }

    } catch (error) {
      this.btnOtpDisabled = false;
      this.alertService.error(error);
    }
  }
  async confirm() {
    try {
      this.otpPass.otp = this.otp;
      console.log(this.otpPass);
      const rs: any = await this.standardService.otpConfirm(this.otpPass);
      localStorage.setItem('token', rs.token);
      console.log(rs);
      if (rs.ok) {
        const obj: any = {};
        obj.firstName = this.firstName;
        obj.lastName = this.lastName;
        obj.titleName = this.titleName;
        obj.birthDate = '01-01-' + this.year;
        obj.telephone = this.telephone;
        obj.cid = this.idcard === undefined ? this.idforeign : this.idcard;
        obj.passport = this.passport;
        obj.nationTypeId = this.NationalityType;
        obj.gender = this.gender;
        obj.telephoneBoss = this.telephoneBoss;
        obj.province_code = this.provinceCode;
        obj.district_code = this.districtCode;
        obj.subdistrict_code = this.subDistrictCode;
        console.log(obj);

        const urs: any = await this.standardService.savePreRegister(obj);
        console.log(urs);

        this.userId = urs.rows[0];
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
      this.value = this.telephone;
      this.values = this.value.split('/n');
      this.codeList = [
        '', 'CODE128',
        'CODE128A', 'CODE128B', 'CODE128C',
        'UPC', 'EAN8', 'EAN5', 'EAN2',
        'CODE39',
        'ITF14',
        'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
        'pharmacode',
        'codabar'
      ];
      const rs: any = await this.standardService.uploadFile(this.filesToUpload, this.userId);
      if (rs.ok) {
        this.fileName = null;
        this.filesToUpload = null;
        this.alertService.success();
      }
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

  onClickOpenCamera() {
    this.camera.openWebcam();
  }

  onSaveFile(e) {

  }
}
