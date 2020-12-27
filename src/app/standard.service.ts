import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StandardService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  async getProvince() {
    const url = `${this.apiUrl}/province`;
    return await this.http.get(url).toPromise();
  }

  async getDistrict() {
    const url = `${this.apiUrl}/district`;
    return await this.http.get(url).toPromise();
  }

  async getSubDistrict() {
    const url = `${this.apiUrl}/subdistrict`;
    return await this.http.get(url).toPromise();
  }

  async otp(telNo) {
    const url = `${this.apiUrl}/login/user`;
    return await this.http.post(url, { telephone: telNo }).toPromise();
  }

  async otpConfirm(data) {
    const url = `${this.apiUrl}/login/user/verify`;
    return await this.http.post(url, data).toPromise();
  }

  async savePreRegister(data) {
    const url = `${this.apiUrl}/register/pre`;
    return await this.http.post(url, data).toPromise();
  }

  uploadFile(userId: any, files: File) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      if (files) {
        formData.append('files', files, files.name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const token = '';
      const url = `${this.apiUrl}/register/pre/upload-document/${userId}&token=${token}`;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}
