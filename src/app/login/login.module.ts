import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    LoginRoutingModule,
    FormsModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LoginComponent
  ],
})
export class LoginModule { }
