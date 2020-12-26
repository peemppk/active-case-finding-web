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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TranslatePipe,
    LangualComponent,
    TranslateDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    LoginModule,
    BrowserAnimationsModule
  ],
  providers: [
    TranslationService
  ],
  bootstrap: [AppComponent],
  exports: [TranslatePipe]
})
export class AppModule { }
