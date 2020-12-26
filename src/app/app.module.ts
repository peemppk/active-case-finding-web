import { TranslationService } from './translation.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from './translate.pipe';
import { LangualComponent } from './langual/langual.component';
import { TranslateDirective } from './translate.directive';
import { environment } from '../environments/environment';
import { CameraComponent } from './camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TranslatePipe,
    LangualComponent,
    TranslateDirective,
    CameraComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    LoginModule,
    BrowserAnimationsModule,
    WebcamModule
  ],
  providers: [
    TranslationService,
    { provide: 'API_URL', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent],
  exports: [
    TranslatePipe,
    CameraComponent
  ]
})
export class AppModule { }
