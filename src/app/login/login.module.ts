import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../alert.service';
import { StandardService } from '../standard.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginRoutingModule,
    FormsModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AlertService,
    StandardService
  ]
})
export class LoginModule { }
